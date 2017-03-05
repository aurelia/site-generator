const fs = require('./file-system');
const path = require('path');

exports.ArticleProcessor = class {
  constructor(article) {
    this.article = article;
  }

  process() {
    return fs.readFile(this.article.src).then(data => {
      return new ArticleWriter(null, null, this.article.dest);
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
    let htmlDest = path.join(outDir, this.dest) + '.html';
    let jsonDest = path.join(outDir, this.dest) + '.json';

    return fs.writeFile(htmlDest, this.html)
      .then(() => fs.writeFile(jsonDest, this.json));
  }
}
