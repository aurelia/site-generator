const fs = require('../file-system');
const path = require('path');
const commonmark = require('commonmark');
const {ArticleParser} = require('../processors/article/article-parser');
const handlebars = require('handlebars');
const htmlToText = require('html-to-text');

const tempatePath = require.resolve('../templates/blog-detail.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

const BlogProcessor = exports.BlogProcessor = class {
  constructor(blog) {
    this.blog = blog;
  }

  process(context) {
    console.log(`Processing ${this.blog.name}.`);

    return fs.readFile(this.blog.src).then(data => {
      const reader = new ArticleParser(this.blog, data.toString(), template);
      const result = reader.parse(context);

      this.blog.content = result.content;
      this.blog.description = getDescription(result.content);
      
      const json = createJSON(this.blog, result.metadata, result.content);

      return new BlogWriter(this.blog, json, result.html);
    });
  }
}

function getDescription(content) {
  content = content.trim();

  let index1 = content.indexOf('#');
  let index2 = content.indexOf('---');
  let index;

  if (index1 !== -1 && index2 !== -1) {
    index = index1 < index2 ? index1 : index2;
  } else {
    index = index1 === -1 ? index2 : index1;
  }

  if (index !== -1) {
    content = content.substring(0, index);
  }
  
  index = content.indexOf('\n');

  if (index !== -1) {
    content = content.substring(0, index);
  }

  let html = writer.render(reader.parse(content));

  return htmlToText.fromString(html, {
    wordwrap: false,
    hideLinkHrefIfSameAsText: true
  }).trim();
}

class BlogWriter {
  constructor(model, json, html) {
    this.model = model;
    this.json = json;
    this.html = html;
  }

  write(render, outDir) {
    const htmlDest = path.join(outDir, this.json.links.html);
    const htmlFragmentDest = path.join(outDir, this.json.links.fragment);
    const jsonDest = path.join(outDir, this.json.links.self);

    return Promise.all([
      fs.writeFile(htmlDest, render(this.json, this.html)),
      fs.writeFile(htmlFragmentDest, this.html),
      fs.writeFile(jsonDest, JSON.stringify(this.json))
    ]);
  }
}

function createJSON(model, metadata, content){
  return {
    name: model.name || metadata.name,
    description: model.description || metadata.description,
    author: metadata.author,
    links: {
      static: model.dest,
      html: path.join(model.dest, 'index.html'),
      fragment: path.join(model.dest, 'index-fragment.html'),
      self: path.join(model.dest, 'index.json')
    },
    content: content
  }
}
