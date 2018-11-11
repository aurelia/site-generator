const path = require('path');
const handlebars = require('handlebars');
const fs = require('../../file-system');
const APIParser = require('./api-parser').APIParser;
const APIMarkdownGenerator = require('./api-markdown-generator').APIMarkdownGenerator;

const moduleTemplate = handlebars.compile(fs.readFileSync(require.resolve('../../templates/module.html')));
const classOrInterfaceTemplate = handlebars.compile(fs.readFileSync(require.resolve('../../templates/classOrInterface.html')));
const constantOrPropertyTemplate = handlebars.compile(fs.readFileSync(require.resolve('../../templates/constantOrProperty.html')));
const functionOrMethodTemplate = handlebars.compile(fs.readFileSync(require.resolve('../../templates/functionOrMethod.html')));

exports.APIProcessor = class {
  constructor(api) {
    this.api = api;
  }

  process(context) {
    console.log(`Processing API ${this.api.name}`);

    return new APIParser(this.api).parse(context).then(model => {
      return new ModuleWriter(this.api, model);
    });
  }
}

class ModuleWriter {
  constructor(api, model) {
    this.api = api;
    this.model = model;
    this.json = createModuleJSON(model);
  }

  write(render, outDir) {
    const root = path.join(outDir, this.model.api.dest);
    const markdownDest = path.join(root, 'index.md');
    const htmlDest = path.join(root, 'index.html');
    const htmlFragmentDest = path.join(root, 'index-fragment.html');
    const jsonDest = path.join(root, 'index.json');

    const writePromises = [];

    const markdown = new APIMarkdownGenerator().generate(this.json);
    const html = moduleTemplate(this.json);

    writePromises.push(fs.writeFile(markdownDest, markdown));
    writePromises.push(fs.writeFile(htmlDest, render(this.json, html)));
    writePromises.push(fs.writeFile(htmlFragmentDest, html));
    writePromises.push(fs.writeFile(jsonDest, JSON.stringify(this.json)));

    this.model.classes.forEach(x => writePromises.push(writeMember(root, this.json.links.static, x, render, classOrInterfaceTemplate)));
    this.model.interfaces.forEach(x => writePromises.push(writeMember(root, this.json.links.static, x, render, classOrInterfaceTemplate)));
    this.model.constants.forEach(x => writePromises.push(writeMember(root, this.json.links.static, x, render, constantOrPropertyTemplate)));
    this.model.functions.forEach(x => writePromises.push(writeMember(root, this.json.links.static, x, render, functionOrMethodTemplate)));

    return Promise.all(writePromises);
  }
}

function writeMember(root, apiRoot, model, render, template) {
  root = path.join(root, model.kindString.toLowerCase(), model.name);
  apiRoot = path.join(apiRoot, model.kindString.toLowerCase(), model.name);

  let json = createMemberJSON(apiRoot, model);

  const htmlDest = path.join(root, 'index.html');
  const htmlFragmentDest = path.join(root, 'index-fragment.html');
  const jsonDest = path.join(root, 'index.json');

  const writePromises = [];
  const html = template(json);

  writePromises.push(fs.writeFile(htmlDest, render(json, html)));
  writePromises.push(fs.writeFile(htmlFragmentDest, html));
  writePromises.push(fs.writeFile(jsonDest, JSON.stringify(json)));

  if (model.properties) {
    model.properties.forEach(x => writePromises.push(writeMember(root, apiRoot, x, render, constantOrPropertyTemplate)));
  }

  if (model.methods) {
    model.methods.forEach(x => writePromises.push(writeMember(root, apiRoot, x, render, functionOrMethodTemplate)));
  }

  return Promise.all(writePromises);
}

function createMemberJSON(apiRoot, model) {
  return Object.assign({
    links: {
      static: apiRoot,
      html: path.join(apiRoot, 'index.html'),
      fragment: path.join(apiRoot, 'index-fragment.html'),
      self: path.join(apiRoot, 'index.json')
    }
  }, model);
}

function createModuleJSON(model){
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
