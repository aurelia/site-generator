// @ts-check
const typedoc = require("typedoc");
const fs = require('../../file-system');

exports.APIParser = class {
  constructor(api) {
    this.api = api;
  }

  parse(context) {
    const options = {
      target: 'es6',
      includeDeclarations: true,
      moduleResolution: 'node',
      name: this.api.name + ' Docs', 
      mode: 'modules',
      excludeExternals: true,
      ignoreCompilerErrors: true,
      allowSyntheticDefaultImport: true,
      version: true
    };

    // @ts-ignore
    const app = new typedoc.Application(options);
    const input = Array.isArray(this.api.src) ? this.api.src : [this.api.src];
    const src = app.expandInputFiles(input);
    const project = app.convert(src);
    const simpleGraph = project.toObject().children[0];
    
    const model = walkChildren(new ModuleModel(this.api), simpleGraph.children, context);
    model.classes.forEach(x => registerSymbols(this.api, context, x));
    model.interfaces.forEach(x => registerSymbols(this.api, context, x));
    model.constants.forEach(x => registerSymbols(this.api, context, x));
    model.functions.forEach(x => registerSymbols(this.api, context, x));

    return fs.readFile(this.api.package).then(data => {
      model.package = JSON.parse(data.toString());
      return model;
    });
  }
}

function registerSymbols(api, context, entry, owner) {
  let item = {
    libraryName: api.name,
    libraryHref: api.dest,
    apiKind: entry.kindString,
    apiName: entry.name
  };

  if (owner) {
    item.ownerKind = owner.apiKind;
    item.ownerName = owner.apiName;
  }

  context.searchIndex.api.add(item);
  
  if (entry.properties) {
    entry.properties.forEach(x => registerSymbols(api, context, x, item));
  } 
  
  if (entry.methods) {
    entry.methods.forEach(x => registerSymbols(api, context, x, item));
  }
}

function walkChildren(parent, children, context) {
  if (children) {
    children.forEach(child => {
      let newChild = addTypedObject(parent, child);

      if (newChild) {
        // @ts-ignore
        walkChildren(newChild, newChild.children, context);
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
    thisObject = new ConstantModel(child);
    parent.constants.push(thisObject);
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

class ModuleModel {
  constructor(api) {
    this.api = api;
    this.name = api.name;
    this.kindString = 'Module';
    this.classes = [];
    this.interfaces = [];
    this.constants = [];
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

class ConstantModel {
  constructor(data) {
    Object.assign(this, data);
    this.kindString = 'Constant';
  }
}

class FunctionModel {
  constructor(data) {
    Object.assign(this, data);
  }
}
