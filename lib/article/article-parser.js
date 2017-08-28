const commonmark = require('commonmark');
const handlebars = require('handlebars');
const Prism = require('prismjs');
const os = require('os');
const HTMLParser = require('./html-parser').HTMLParser;
const fs = require('../file-system');
const path = require('path');

require('prismjs/components/prism-markup');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-powershell');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();
const availableNotificationTypes = ['info', 'warning', 'danger'];

const tempatePath = require.resolve('../templates/article.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.ArticleParser = class {
  constructor(article, text) {
    this.article = article;
    this.text = text;
  }

  parse(context) {
    const metadata = getMetadata(this.text);
    const content = getContent(this.text);
    const transformed = transformHTML(content);
    const result = transformMarkdown(transformed, this.article, context);

    return {
      metadata: metadata,
      content: content,
      headers: result.headers,
      html: template(Object.assign({}, metadata, { content: result.html }))
    }
  }
}

function getMetadata(text) {
  const matcher = new RegExp('^---([\\s|\\S]*?)---');
  const results = matcher.exec(text);

  if (!results) {
    throw new Error('Metadata missing from article.');
  }

  return JSON.parse(results[1]);
}

function getContent(text) {
  const matcher = new RegExp('^ *?\\---[^]*?---*');
  const content = text.replace(matcher, '');

  if (!content) {
    throw new Error('Content missing from article.')
  }

  return content;
}

let languageLookup = {
  'HTML': 'markup',
  'TypeScript': 'typescript',
  'Shell': 'powershell'
};

function transformHTML(input) {
  let output = '';
  let needsEncoding = false;
  let language = '';

  HTMLParser(input, {
    start(tag, attrs, unary) {
      output += "<" + tag;

      for (var i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        
        output += " " + attr.name + '="' + attr.escaped + '"';

        if (attr.name === 'lang') {
          language = attr.escaped;
        }
      }

      output += ">";

      if(tag === 'source-code') {
        needsEncoding = true;
      }
    },
    end(tag) {
      if(tag === 'source-code') {
        needsEncoding = false;
      }

      output += "</" + tag + ">";
    },
    chars(text) {
      if(needsEncoding) {
        let highlightLanguage = languageLookup[language] || 'javascript'
        text = escape(`<pre class="language-${highlightLanguage}"><code>${highlightCode(text, highlightLanguage)}</code></pre>`);
      }
      
      output += text;
    },
    comment(text) {
      output += "<!--" + text + "-->";
    }
  });

  return output;
}

function highlightCode(code, language) {
  return Prism.highlight(code, Prism.languages[language]);
}

function format(text) {
  return fixIndent(htmlEscape(text));
}

function htmlEscape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function fixIndent(markdown) {
  /*
  This is intended to remove indentation that is not really part of
  the markdown, to preserve the ability to indent the markup properly.
  In the example below the total indentation will be reduced by 4 characters.
  |
  |<template>
  |  <markdown>
  |    # hello world
  |
  |    lorem ipsum bla bla
  |
  |        var x = 3;
  |
  |  </markdown>
  |</template>
  |
  */
  let result = /^( +)\S/im.exec(markdown);

  if (result) {
    markdown = markdown.replace(new RegExp('^ {' + result[1].length.toString() + '}', 'gim'), '');
  }

  return markdown;
}

function slugify(string) {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

function transformMarkdown(content, article, context) {
  const parsed = reader.parse(content);
  const walker = parsed.walker();
  const headers = [];
  let event, node;
  let sectionHeader = null;
  let type;
  let section = null;

  while (event = walker.next()) {
    node = event.node;
    type = node.type.toLowerCase();

    if (event.entering) {
      switch(type) {
        case 'heading':
          if(node.level === 2) {
            if (sectionHeader !== null) {
              node.insertBefore(wrapInSection(sectionHeader, section, node, headers));
            }

            section = {
              articleName: article.name,
              articleHref: article.dest,
              sectionName: node.firstChild.firstChild.literal,
              sectionId: slugify(node.firstChild.firstChild.literal),
              text: ''
            };

            context.searchIndex.articles.add(section);
            sectionHeader = node;
          } else if (section && node.level > 2) {
            section.text += ' ' + node.firstChild.literal;
          }
          
          break;
        case 'html_block':
          node.literal = unescape(node.literal);
          break;
      }
    } else {
      switch (type) {
        case 'image':
          if (!isExternalLink(node.destination)) {
            let imageSource = path.join(path.parse(article.src).dir, node.destination);
            let imageDestination = path.join(article.dest, node.destination);

            context.images.add(imageSource, imageDestination);
            node.destination = imageDestination;
          }
          break;
        case 'link':
          if(node.destination) {
            if (isExternalLink(node.destination)) {
              let a = new commonmark.Node('html_block');
              a.literal = `<a href="${node.destination}" target="_blank">${node.firstChild.literal}</a>`
              node.insertBefore(a);
              node.unlink();
            }
          }
          break;
        case 'block_quote':
          if (node.firstChild && node.firstChild.literal) {
            section.text += ' ' + node.firstChild.literal;
          }

          let literal = node.firstChild.firstChild.literal;

          if(literal) {
            literal = literal.trim();

            let typeAndHeading = literal.split(':').map(x => x.trim());
            let notificationType = typeAndHeading[0].toLowerCase();

            if(availableNotificationTypes.indexOf(notificationType) !== -1) {
              let htmlBlock = new commonmark.Node('html_block');
              let current = node.firstChild;

              current.firstChild.unlink();
              htmlBlock.literal = `<div class="${notificationType}"><div class="icon"> <i></i> </div>`;

              if(typeAndHeading[1]) {
                htmlBlock.literal += `<h4>${typeAndHeading[1]}</h4>`;
              }

              while (current) {
                htmlBlock.literal += writer.render(current);
                current = current.next;
              }

              htmlBlock.literal += "</div>";
              node.insertBefore(htmlBlock);
              node.unlink();
            }
          }
          break;
        case 'item':
          if (node.firstChild && node.firstChild.firstChild && node.firstChild.firstChild.literal) {
            section.text += ' ' + node.firstChild.firstChild.literal;
          }
          break;
        case 'paragraph':
        case 'emph':
          if (node.firstChild && node.firstChild.literal) {
            section.text += ' ' + node.firstChild.literal;
          }
          break;
      }
    }
  }

  if (sectionHeader !== null) {
    parsed.appendChild(wrapInSection(sectionHeader, section, node, headers));
  }

  return {
    headers: headers,
    html: writer.render(parsed)
  };
}

function wrapInSection(sectionHeader, section, node, headers) {
  const htmlBlock = new commonmark.Node('html_block');
  let current = sectionHeader.next;

  sectionHeader.unlink();
  htmlBlock.literal = `<section><h2 id="${section.sectionId}">${section.sectionName}</h2>`;
  headers.push({
    id: section.sectionId,
    name: section.sectionName
  });

  while(current !== null && current !== node) {
    let next = current.next;
    htmlBlock.literal += writer.render(current);
    current.unlink();
    current = next;
  }

  htmlBlock.literal += "</section>";

  return htmlBlock;
}

function isExternalLink(url) {
  return url.indexOf(':') > -1 || url.indexOf('//') > -1;
}
