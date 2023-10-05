const commonmark = require('commonmark');
const handlebars = require('handlebars');
const yaml = require('js-yaml');
const parseAuthor = require('parse-author');
const Prism = require('prismjs');
const os = require('os');
const fs = require('../../file-system');
const path = require('path');

require('prismjs/components/prism-markup');
require('prismjs/components/prism-javascript');
require('prismjs/components/prism-typescript');
require('prismjs/components/prism-powershell');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();
const availableNotificationTypes = ['info', 'warning', 'danger'];

const tempatePath = require.resolve('../../templates/article.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.ArticleParser = class {
  constructor(article, text, templateOverride, additionalTemplateData) {
    this.article = article;
    this.text = text;
    this.template = templateOverride || template;
    this.additionalTemplateData = additionalTemplateData || {};
  }

  parse(context) {
    const metadata = getMetadata(this.text);
    const content = getContent(this.text);
    const result = transformMarkdown(content, this.article, context);
    const templateInput = Object.assign({}, this.additionalTemplateData, metadata, { content: result.html });

    return {
      metadata: metadata,
      content: content,
      headers: result.headers,
      html: this.template(templateInput)
    }
  }
}

const getMetadata = exports.getMetadata = function(text, path) {
  const matcher = new RegExp('^---([\\s|\\S]*?)---');
  const results = matcher.exec(text);

  if (!results) {
    throw new Error(`Metadata missing from article. ${path || 'unknown path'}`);
  }

  let metadata = yaml.load(results[1]);

  if (typeof metadata.author === 'string') {
    metadata.author = parseAuthor(metadata.author);
  }

  if (typeof metadata.updatedAt === 'string') {
    metadata.updatedAt = new Date(metadata.updatedAt.replace(/['"]/g, ''));
  }

  if (typeof metadata.publishedAt === 'string') {
    metadata.publishedAt = new Date(metadata.publishedAt.replace(/['"]/g, ''));
  }

  return metadata;
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
  'html': 'markup',
  'markup': 'markup',
  'TypeScript': 'typescript',
  'typescript': 'typescript',
  'Shell': 'powershell',
  'shell': 'powershell',
  'JSON': 'javascript',
  'json': 'javascript',
  'ES Next': 'javascript'
};

function highlightCode(code, language) {
  return Prism.highlight(code, Prism.languages[language]);
}

const slugify = exports.slugify = function(string) {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

function transformMarkdown(content, article, context) {
  const parsed = reader.parse(content);
  const walker = parsed.walker();
  const headers = [];
  let codeListings = [];
  let lastListing = null;
  let event, node;
  let sectionHeader = null;
  let type;
  let section = null;
  let inParagraph = false;
  let paragraphText = '';

  function addSectionText(text) {
    if (section) {
      section.texts.push(text);
    }
  }

  function finishSection() {
    codeListings.forEach(renderCodeListing);
    codeListings = [];

    section.text = section.texts.join(' ');
    delete section.texts;
  }

  while (event = walker.next()) {
    node = event.node;
    type = node.type.toLowerCase();

    if (event.entering) {
      switch(type) {
        case 'heading':
          let sectionName = node.firstChild.literal;

          if(node.level === 2) {
            if (sectionHeader !== null) {
              finishSection();
              node.insertBefore(wrapInSection(sectionHeader, section, node, headers));
            }

            section = {
              articleName: article.name,
              articleHref: article.dest,
              sectionName: sectionName,
              sectionId: slugify(sectionName),
              texts: []
            };

            context.searchIndex.articles.add(section);
            sectionHeader = node;
          } else if (section && node.level > 2) {
            addSectionText(sectionName);
          }

          break;
        case 'html_block':
          node.literal = unescape(node.literal);
          break;
        case 'code_block':
          const sourceCode = createSourceCode(node);

          if (sourceCode.isVariant) {
            lastListing.sources.push(sourceCode);
          } else {
            lastListing = createCodeListing();
            codeListings.push(lastListing);

            lastListing.sources.push(sourceCode);
            node.insertBefore(lastListing.block);
          }
          
          node.unlink();
          break;
        case 'paragraph':
          inParagraph = true;
          paragraphText = '';
          break;
        case 'softbreak':
          if (inParagraph) {
            paragraphText += ' ';
          }
          break;
        case 'code':
        case 'text':
          if (inParagraph) {
            paragraphText += node.literal;
          }
          break;
      }
    } else {
      switch (type) {
        case 'image':
          if (!isExternalLink(node.destination) && context.moveImages) {
            let imageSource = path.join(path.parse(article.src).dir, node.destination);
            let imageDestination = path.join(article.dest, node.destination);

            context.images.add(imageSource, imageDestination);
            node.destination = imageDestination;
          }
          break;
        case 'link':
          if(node.destination && !node.isExternalLink) {
            if (isExternalLink(node.destination)) {
              if (isSandboxEmbed(node.destination)) {
                let sandbox = new commonmark.Node('html_block');
                sandbox.literal = `<au-sandbox src="${node.destination}" heading="${node.firstChild.literal}"></au-sandbox>`;
                node.isExternalLink = true;
                node.insertBefore(sandbox);
                node.unlink();
              } else {
                let a = new commonmark.Node('html_block');
                a.literal = `<a href="${node.destination}" target="_blank">${node.firstChild.literal}</a>`;
                node.isExternalLink = true;
                node.insertBefore(a);
                node.unlink();
              }
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
        case 'paragraph':
          addSectionText(paragraphText);
          inParagraph = false;
          break;
      }
    }
  }

  if (sectionHeader !== null) {
    finishSection();
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

function indentCodeBlock(code) {
  return os.EOL + code.split(os.EOL).map(x => '  ' + x).join(os.EOL);
}

function isSandboxEmbed(url) {
  return url.toLowerCase().indexOf('codesandbox.io/embed') !== -1;
}

function parseCodeBlockInfo(node) {
  const info = node.info;

  if (!info) {
    return {
      isVariant: false,
      lang: 'JavaScript'
    }
  }

  const langOrEmtpy = info.substr(0, info.indexOf(' ')); // "TypeScript"
  const titleOrLang = info.substr(info.indexOf(' ') + 1); // "Hello World [variant]"

  if (!langOrEmtpy) {
    return {
      isVariant: false,
      lang: titleOrLang.trim() || 'JavaScript'
    }
  }

  const lang = langOrEmtpy.trim();

  if (titleOrLang.indexOf('[variant]') !== -1) {
    return {
      heading: titleOrLang.replace('[variant]', '').trim(),
      isVariant: true,
      lang: lang,
    }
  }

  return {
    heading: titleOrLang.trim(),
    isVariant: false,
    lang: lang
  };
}

function createSourceCode(node) {
  const parsedInfo = parseCodeBlockInfo(node);

  return {
    heading: parsedInfo.heading,
    isVariant: parsedInfo.isVariant,
    highlightLanguage: languageLookup[parsedInfo.lang] || 'javascript',
    languageName: parsedInfo.lang,
    code: node.literal
  };
}

function createCodeListing() {
  return {
    block: new commonmark.Node('html_block'),
    sources: []
  };
}

function renderCodeListing(info) {
  const block = info.block;
  const heading = info.sources[0].heading;

  // TODO: If only one source that is TS, generate a JS source.

  block.literal = `
<code-listing${heading ? ` heading="${heading}"` : ''}>
  ${info.sources.map(renderSourceCode).join(os.EOL)}
</code-listing>`;
}

function renderSourceCode(sourceCode) {
  const languageName = sourceCode.languageName;
  const highlightLanguage = sourceCode.highlightLanguage;
  const code = sourceCode.code;
  const heading = sourceCode.heading || '';

  return `
<source-code lang="${languageName}" heading="${heading}">
  <pre class="language-${highlightLanguage}">
    <code>${highlightCode(indentCodeBlock(code), highlightLanguage)}</code>
  </pre>
</source-code>
  `;
}
