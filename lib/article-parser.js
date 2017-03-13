const commonmark = require('commonmark');
const handlebars = require('handlebars');
const HTMLParser = require('./html-parser').HTMLParser;
const fs = require('./file-system');

let reader = new commonmark.Parser();
let writer = new commonmark.HtmlRenderer();
let availableNotificationTypes = ['info', 'warning', 'danger'];

let tempatePath = require.resolve('./templates/article.html');
let source = fs.readFileSync(tempatePath);
let template = handlebars.compile(source);

exports.ArticleParser = class {
  constructor(text) {
    this.text = text;
  }

  parse() {
    let metadata = getMetadata(this.text);
    let content = getContent(this.text);
    let transformed = transformHTML(content);
    let html = transformMarkdown(transformed);

    return {
      metadata: metadata,
      content: content,
      html: template(Object.assign({}, metadata, { content: html }))
    }
  }
}

function getMetadata(text) {
  let matcher = new RegExp('^---([\\s|\\S]*?)---');
  let results = matcher.exec(text);

  if (!results) {
    throw new Error('Metadata missing from article.');
  }

  return JSON.parse(results[1]);
}

function getContent(text) {
  let matcher = new RegExp('^ *?\\---[^]*?---*');
  let content = text.replace(matcher, '');

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
  let parsed = reader.parse(content);
  let walker = parsed.walker();
  let event, node;
  let sectionHeader = null;
  let sectionId;
  let sectionVersion;
  let type;

  while (event = walker.next()) {
    node = event.node;
    type = node.type.toLowerCase();

    if (event.entering) {
      switch(type) {
        case 'heading':
          if(node.level === 2) {
            if (sectionHeader !== null) {
              node.insertBefore(wrapInSection(sectionHeader, sectionId, sectionVersion, node));
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
              let info = node.destination.replace('aurelia-doc://', '');

              if (info.indexOf('section/') === 0) {
                info = info.replace('section/', '');
                let parts = info.split('/version/');
                sectionId = parts[0];
                sectionVersion = parts[1];
              } else if (info.indexOf('resource/') === 0) {
                info = info.replace('resource/', '');
                let ref = new commonmark.Node('html_block');
                ref.literal = `<resource-ref resource-id="${info}" heading="${node.firstChild.literal}"></resource-ref>`;
                node.insertBefore(ref);
                node.unlink();
              }
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
              htmlBlock.literal = `<au-alert type="${notificationType}"`;

              if(typeAndHeading[1]) {
                htmlBlock.literal += `heading="${typeAndHeading[1]}"`;
              }

              htmlBlock.literal += '>';

              while (current) {
                htmlBlock.literal += writer.render(current);
                current = current.next;
              }

              htmlBlock.literal += "</au-alert>";
              node.insertBefore(htmlBlock);
              node.unlink();
            }
          }
          break;
      }
    }
  }

  if (sectionHeader !== null) {
    parsed.appendChild(wrapInSection(sectionHeader, sectionId, sectionVersion, node));
  }

  return writer.render(parsed);
}

function wrapInSection(sectionHeader, sectionId, sectionVersion, node) {
  let htmlBlock = new commonmark.Node('html_block');
  let current = sectionHeader.next;

  sectionHeader.unlink();
  htmlBlock.literal = `<au-doc-section uid="${sectionId}" version="${sectionVersion}" heading="${sectionHeader.firstChild.firstChild.literal}">`;

  while(current !== null && current !== node) {
    let next = current.next;
    htmlBlock.literal += writer.render(current);
    current.unlink();
    current = next;
  }

  htmlBlock.literal += "</au-doc-section>";

  return htmlBlock;
}

function isExternalLink(url) {
  return url.indexOf(':') > -1 || url.indexOf('//') > -1;
}
