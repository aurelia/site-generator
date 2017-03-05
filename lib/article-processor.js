const fs = require('./file-system');
const path = require('path');

exports.ArticleProcessor = class {
  constructor(article) {
    this.article = article;
  }

  process() {
    return fs.readFile(this.article.src).then(data => {
      return new ArticleWriter(
        `<html><body><h1>${this.article.name}</h1></body></html>`,
        `{ "name": "${this.article.name}" }`,
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
