const path = require('path');
const fs = require('./file-system');
const APIParser = require('./api-parser').APIParser;

exports.APIProcessor = class {
  constructor(api) {
    this.api = api;
  }

  process() {
    console.log(`Processing API ${this.api.name}`);

    let parser = new APIParser(this.api.name, this.api.src);
    let result = parser.parse();

    return Promise.resolve(new APIWriter(result.markdown, result.html, result.json, this.api.dest));
  }
}

class APIWriter {
  constructor(markdown, html, json, dest) {
    this.markdown = markdown;
    this.html = html;
    this.json = json;
    this.dest = dest;
  }

  write(outDir) {
    let markdownDest = path.join(outDir, this.dest, 'index.md');
    let htmlDest = path.join(outDir, this.dest, 'index.html');
    let jsonDest = path.join(outDir, this.dest, 'index.json');

    return fs.writeFile(markdownDest, this.markdown)
      .then(() => fs.writeFile(htmlDest, this.html))
      .then(() => fs.writeFile(jsonDest, this.json));
  }
}
