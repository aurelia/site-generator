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
        `<html><body>${result.html}</body></html>`,
        JSON.stringify(Object.assign({content: result.html}, result.metadata)),
        this.article.dest
        );
    });
  }
}

class ArticleWriter {
  constructor(html, json, dest) {
    this.html = html;
    this.json = json;
    this.dest = dest;
  }

  write(outDir) {
    let htmlDest = path.join(outDir, this.dest, 'index.html');
    let jsonDest = path.join(outDir, this.dest, 'index.json');

    return fs.writeFile(htmlDest, this.html)
      .then(() => fs.writeFile(jsonDest, this.json));
  }
}
