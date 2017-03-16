const commonmark = require('commonmark');
const handlebars = require('handlebars');
const HTMLParser = require('./html-parser').HTMLParser;
const fs = require('../file-system');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();
const availableNotificationTypes = ['info', 'warning', 'danger'];

const tempatePath = require.resolve('../templates/article.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.ArticleParser = class {
  constructor(text) {
    this.text = text;
  }

  parse() {
    const metadata = getMetadata(this.text);
    const content = getContent(this.text);
    const transformed = transformHTML(content);
    const result = transformMarkdown(transformed);

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

function transformHTML(input) {
  let output = '';
  let needsEncoding = false;

  HTMLParser(input, {
    start(tag, attrs, unary) {
      output += "<" + tag;

      for (var i = 0; i < attrs.length; i++) {
        output += " " + attrs[i].name + '="' + attrs[i].escaped + '"';
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
        text = escape(text);
      }

      output += text;
    },
    comment(text) {
      output += "<!--" + text + "-->";
    }
  });

  return output;
}

function transformMarkdown(content) {
  const parsed = reader.parse(content);
  const walker = parsed.walker();
  const headers = [];
  let event, node;
  let sectionHeader = null;
  let type;

  while (event = walker.next()) {
    node = event.node;
    type = node.type.toLowerCase();

    if (event.entering) {
      switch(type) {
        case 'heading':
          if(node.level === 2) {
            if (sectionHeader !== null) {
              node.insertBefore(wrapInSection(sectionHeader, node, headers));
            }

            sectionHeader = node;
          }
          break;
      }
    } else {
      switch (type) {
        case 'image':
          if (!isExternalLink(node.destination)) {
            console.log(node.destination);
            //node.destination = join(this.translation.docsUrl, node.destination)
          }
          break;
        case 'link':
          if(node.destination) {
            if(node.destination.indexOf('aurelia-doc://') === 0) {
              //do nothing
            } else if (isExternalLink(node.destination)) {
              let a = new commonmark.Node('html_block');
              a.literal = `<a href="${node.destination}" target="_blank">${node.firstChild.literal}</a>`
              node.insertBefore(a);
              node.unlink();
            }
          }
          break;
        case 'block_quote':
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
      }
    }
  }

  if (sectionHeader !== null) {
    parsed.appendChild(wrapInSection(sectionHeader, node, headers));
  }

  return {
    headers: headers,
    html: writer.render(parsed)
  };
}

function wrapInSection(sectionHeader, node, headers) {
  const htmlBlock = new commonmark.Node('html_block');
  let current = sectionHeader.next;

  sectionHeader.unlink();
  htmlBlock.literal = `<section><h2>${sectionHeader.firstChild.firstChild.literal}</h2>`;
  headers.push({
    name: sectionHeader.firstChild.firstChild.literal
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
