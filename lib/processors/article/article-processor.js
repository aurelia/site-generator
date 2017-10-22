const path = require('path');
const fs = require('../../file-system');
const ArticleParser = require('./article-parser').ArticleParser;

exports.ArticleProcessor = class {
  constructor(article) {
    this.article = article;
  }

  process(context) {
    return fs.readFile(this.article.src).then(data => {
      console.log(`Processing Article ${this.article.name}`);

      const reader = new ArticleParser(this.article, data.toString());
      const result = reader.parse(context);

      this.article.items = result.headers;

      const json = createJSON(this.article, result.metadata, result.content);
      
      if (this.article.featured) {
        context.featured.add({
          name: json.name,
          description: json.description,
          author: json.author,
          links: json.links
        });
      }

      return new ArticleWriter(this.article, json, result.html);
    });
  }
}

class ArticleWriter {
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
    keywords: metadata.keywords,
    contributors: metadata.contributors,
    translators: metadata.translators,
    featured: model.featured,
    links: {
      static: model.dest,
      html: path.join(model.dest, 'index.html'),
      fragment: path.join(model.dest, 'index-fragment.html'),
      self: path.join(model.dest, 'index.json')
    },
    content: content
  }
}
