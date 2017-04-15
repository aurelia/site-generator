const path = require('path');
const fs = require('../file-system');
const APIParser = require('./api-parser').APIParser;

exports.APIProcessor = class {
  constructor(api) {
    this.api = api;
  }

  process(context) {
    console.log(`Processing API ${this.api.name}`);

    const parser = new APIParser(this.api);

    return parser.parse(context).then(result => {
      return new APIWriter(this.api, result.markdown, result.html, result.json, this.api.dest);
    });
  }
}

class APIWriter {
  constructor(api, markdown, html, json, dest) {
    this.api = api;
    this.markdown = markdown;
    this.html = html;
    this.json = createJSON(api, json);
    this.dest = dest;
  }

  write(render, outDir) {
    const markdownDest = path.join(outDir, this.dest, 'index.md');
    const htmlDest = path.join(outDir, this.dest, 'index.html');
    const htmlFragmentDest = path.join(outDir, this.dest, 'index-fragment.html');
    const jsonDest = path.join(outDir, this.dest, 'index.json');

    return fs.writeFile(markdownDest, this.markdown)
      .then(() => fs.writeFile(htmlDest, render(this.api.name + " API", this.html)))
      .then(() => fs.writeFile(htmlFragmentDest, this.html))
      .then(() => fs.writeFile(jsonDest, JSON.stringify(this.json)));
  }
}

function createJSON(api, json){
  return Object.assign({
    name: api.name,
    description: api.package.description,
    links: {
      static: api.dest,
      html: path.join(api.dest, 'index.html'),
      fragment: path.join(api.dest, 'index-fragment.html'),
      self: path.join(api.dest, 'index.json')
    }
  }, json);
}
