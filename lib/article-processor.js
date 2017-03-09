const path = require('path');
const fs = require('./file-system');
const ArticleParser = require('./article-parser').ArticleParser;

exports.ArticleProcessor = class {
  constructor(article) {
    this.article = article;
  }

  process() {
    return fs.readFile(this.article.src).then(data => {
      let reader = new ArticleParser(data.toString());
      let result = reader.parse();

      console.log(`Processing Article ${result.metadata.name}`);

      return new ArticleWriter(
        result.metadata.name,
        result.html,
        JSON.stringify(Object.assign({content: result.html}, result.metadata)),
        this.article.dest
        );
    });
  }
}

class ArticleWriter {
  constructor(name, html, json, dest) {
    this.name = name;
    this.html = html;
    this.json = json;
    this.dest = dest;
  }

  write(render, outDir) {
    let htmlDest = path.join(outDir, this.dest, 'index.html');
    let jsonDest = path.join(outDir, this.dest, 'index.json');

    return fs.writeFile(htmlDest, render(this.name, this.html))
      .then(() => fs.writeFile(jsonDest, this.json));
  }
}
