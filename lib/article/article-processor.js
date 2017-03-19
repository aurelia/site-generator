const path = require('path');
const fs = require('../file-system');
const ArticleParser = require('./article-parser').ArticleParser;

exports.ArticleProcessor = class {
  constructor(article) {
    this.article = article;
  }

  process(context) {
    return fs.readFile(this.article.src).then(data => {
      const reader = new ArticleParser(this.article, data.toString());
      const result = reader.parse(context);

      console.log(`Processing Article ${this.article.name}`);

      this.article.items = result.headers;

      return new ArticleWriter(
        this.article,
        result.metadata,
        result.content,
        result.html
        );
    });
  }
}

class ArticleWriter {
  constructor(article, metadata, content, html) {
    this.article = article;
    this.metadata = metadata;
    this.content = content;
    this.html = html;
    this.json = createJSON(article, metadata, content);
  }

  write(render, outDir) {
    const htmlDest = path.join(outDir, this.json.links.html);
    const htmlFragmentDest = path.join(outDir, this.json.links.fragment);
    const jsonDest = path.join(outDir, this.json.links.self);

    return fs.writeFile(htmlDest, render(this.json.name, this.html))
      .then(() => fs.writeFile(htmlFragmentDest, this.html))
      .then(() => fs.writeFile(jsonDest, JSON.stringify(this.json)));
  }
}

function createJSON(article, metadata, content){
  return {
    name: article.name || metadata.name,
    description: metadata.description,
    author: metadata.author,
    keywords: metadata.keywords,
    contributors: metadata.contributors,
    translators: metadata.translators,
    links: {
      static: article.dest,
      html: path.join(article.dest, 'index.html'),
      fragment: path.join(article.dest, 'index-fragment.html'),
      self: path.join(article.dest, 'index.json')
    },
    content: content
  }
}
