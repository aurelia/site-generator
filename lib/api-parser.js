const typedoc = require("typedoc");
const commonmark = require('commonmark');
const APIMarkdownGenerator = require('./api-markdown-generator').APIMarkdownGenerator;
const handlebars = require('handlebars');
const fs = require('./file-system');

let reader = new commonmark.Parser();
let writer = new commonmark.HtmlRenderer();

let tempatePath = require.resolve('./templates/api.html');
let source = fs.readFileSync(tempatePath);
let template = handlebars.compile(source);

exports.APIParser = class {
  constructor(name, src) {
    this.name = name;
    this.src = src;
  }

  parse() {
    var options = {
      target: 'es6',
      includeDeclarations: true,
      moduleResolution: 'node',
      name: this.name + ' Docs', 
      mode: 'modules',
      excludeExternals: true,
      ignoreCompilerErrors: false,
      version: true
    };

    var app = new typedoc.Application(options);
    var input = Array.isArray(this.src) ? this.src : [this.src];
    var src = app.expandInputFiles(input);
    var project = app.convert(src);
    var simpleGraph = project.toObject().children[0];
    var model = walkChildren(new API(), simpleGraph.children);
    model.name = this.name;

    var markdown = new APIMarkdownGenerator().generate(model);
    var html = writer.render(reader.parse(markdown));

    return {
      markdown: markdown,
      html: template(Object.assign({ name: this.name }, { content: html })),
      json: model
    }
  }
}

function walkChildren(parent, children) {
  if (children) {
    children.forEach(child => {
      let newChild = addTypedObject(parent, child);

      if (newChild) {
        walkChildren(newChild, newChild.children);
        cleanItem(newChild);
      }
    });
  }

  return parent;
}

function cleanItem(item) {
  delete item.groups;
  delete item.children;
  delete item.kind;
  delete item.id;

  if (item.parameters) {
    item.parameters.forEach(x => cleanItem(x));
  }

  if (item.signatures) {
    item.signatures.forEach(x => cleanItem(x));
  }
}

function addTypedObject(parent, child) {
  let type = child.kindString;
  let thisObject;

  switch (type) {
  case 'Class':
    thisObject = new ClassModel(child);
    parent.classes.push(thisObject);
    break;
  case 'Constructor':
    thisObject = new ConstructorModel(child);
    parent.constructorMethod = thisObject;
    break;
  case 'Method':
    thisObject = new MethodModel(child);
    parent.methods.push(thisObject);
    break;
  case 'Interface':
    thisObject = new InterfaceModel(child);
    parent.interfaces.push(thisObject);
    break;
  case 'Property':
    thisObject = new PropertyModel(child);
    parent.properties.push(thisObject);
    break;
  case 'Variable':
    thisObject = new VariableModel(child);
    parent.variables.push(thisObject);
    break;
  case 'Signature':
    thisObject = new SignatureModel(child);
    parent.signature.push(thisObject);
    break;
  case 'Function':
    thisObject = new FunctionModel(child);
    parent.functions.push(thisObject);
    break;
  default:
  // Do nothing
  }

  return thisObject;
}

class API {
  constructor() {
    this.classes = [];
    this.interfaces = [];
    this.variables = [];
    this.functions = [];
  }

  findClass(className) {
    return this.classes.find(x => x.name === className);
  }

  findInterface(interfaceName) {
    return this.interfaces.find(x => x.name === interfaceName);
  }
}

class ClassModel {
  constructor(data) {
    this.properties = [];
    this.events = [];
    this.methods = [];

    Object.assign(this, data);
  }
}

class MethodModel {
  constructor(data) { 
    Object.assign(this, data);
  }
}

class ConstructorModel {
  constructor(data) {
    Object.assign(this, data);
  }
}

class InterfaceModel {
  constructor(data) {
    this.properties = [];
    this.events = [];
    this.methods = [];
    
    Object.assign(this, data);
  }
}

class PropertyModel {
  constructor(data) {
    Object.assign(this, data);
  }
}

class SignatureModel {
  constructor(data) {
    Object.assign(this, data);
  }
}

class VariableModel {
  constructor(data) {
    Object.assign(this, data);
  }
}

class FunctionModel {
  constructor(data) {
    Object.assign(this, data);
  }
}
