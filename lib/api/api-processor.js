const path = require('path');
const handlebars = require('handlebars');
const fs = require('../file-system');
const APIParser = require('./api-parser').APIParser;
const APIMarkdownGenerator = require('./api-markdown-generator').APIMarkdownGenerator;

const moduleTemplate = handlebars.compile(fs.readFileSync(require.resolve('../templates/module.html')));

exports.APIProcessor = class {
  constructor(api) {
    this.api = api;
  }

  process(context) {
    console.log(`Processing API ${this.api.name}`);

    return new APIParser(this.api).parse(context).then(model => {
      return new APIWriter(model);
    });
  }
}

class APIWriter {
  constructor(model) {
    this.model = model;
    this.dest = model.api.dest;
    this.json = createJSON(model);
  }

  write(render, outDir) {
    const markdownDest = path.join(outDir, this.dest, 'index.md');
    const htmlDest = path.join(outDir, this.dest, 'index.html');
    const htmlFragmentDest = path.join(outDir, this.dest, 'index-fragment.html');
    const jsonDest = path.join(outDir, this.dest, 'index.json');

    const markdown = new APIMarkdownGenerator().generate(this.model);
    const html = moduleTemplate(this.model);

    return fs.writeFile(markdownDest, markdown)
      .then(() => fs.writeFile(htmlDest, render(this.model.name + " Module", html)))
      .then(() => fs.writeFile(htmlFragmentDest, html))
      .then(() => fs.writeFile(jsonDest, JSON.stringify(this.json)));
  }
}

function createJSON(model){
  let clean = JSON.parse(JSON.stringify(model));
  delete clean.api;
  delete clean.package;

  return Object.assign({
    name: model.name,
    description: model.package.description,
    links: {
      static: model.api.dest,
      html: path.join(model.api.dest, 'index.html'),
      fragment: path.join(model.api.dest, 'index-fragment.html'),
      self: path.join(model.api.dest, 'index.json')
    }
  }, clean);
}
