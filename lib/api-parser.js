const typedoc = require("typedoc");

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
    var model = new API(simpleGraph.children, simpleGraph.groups);

    return {
      markdown: "",
      html: "",
      json: JSON.stringify(model, null, '\t')
    }
  }
}

function checkForChildren(obj) {
  if (obj && obj.children) {
    obj.children.forEach(child => {
      let newChild = castObjectAsType(child, obj);
      checkForChildren(newChild);
    });
  }
}

function checkForGroups(obj) {
  if (obj && obj.groups) {
    obj.groups.forEach(group => {
      group.kindName = group.kind.name;
      obj.groups.push(new GroupModel(group));
      checkForGroups(group);
    });
  }
}

// Finds the type and casts the object as it so we can recursively search objects
function castObjectAsType(obj, parent) {
  let type = obj.kindString;
  let thisObject;

  switch (type) {
  case 'Class':
    thisObject = new ClassModel(obj);
    parent.classes.push(thisObject);
    break;
  case 'Constructor':
    thisObject = new ConstructorModel(obj);
    thisObject.signature = new SignatureModel(thisObject.signatures[0]);
    parent.constructorMethod = thisObject;
    break;
  case 'Method':
    thisObject = new MethodModel(obj);
    thisObject.signature = new SignatureModel(thisObject.signatures[0]);
    parent.methods.push(thisObject);
    break;
  case 'Interface':
    thisObject = new InterfaceModel(obj);
    parent.interfaces.push(thisObject);
    break;
  case 'Property':
    thisObject = new PropertyModel(obj);
    parent.properties.push(thisObject);
    break;
  case 'Variable':
    thisObject = new VariableModel(obj);
    parent.variables.push(thisObject);
    break;
  case 'Signature':
    thisObject = new SignatureModel(obj);
    parent.signature.push(thisObject);
    break;
  case 'Function':
    thisObject = new FunctionModel(obj);
    parent.functions.push(thisObject);
    break;
  default:
  // Do nothing
  }

  return thisObject;
}

function prettyName(s) {
  s =  s.replace(/(\-\w)/g, function(m) {
    return m[1].toUpperCase();
  });
  s = s.replace(/([a-z])([A-Z])/g, '$1 $2');
  return s.charAt(0).toUpperCase() + s.slice(1);
}

class API {
  constructor(children, groups) {
    this.children = children;
    this.groups = groups;
    this.classes = [];
    this.interfaces = [];
    this.properties = [];
    this.variables = [];
    this.events = [];
    this.methods = [];
    this.functions = [];

    checkForChildren(this);
    checkForGroups(this);
  }

  findClass(className) {
    return this.classes.find(x => x.name === className);
  }

  findInterface(interfaceName) {
    return this.interfaces.find(x => x.name === interfaceName);
  }
}

class ChildModel {
  constructor(data) {
    this.id = -1;
    this.kind = -1;
    this.kindString = '';
    this.kindName = '';
    this.name = '';
    this.originalName = '';
    this.children = [];
    this.classes = [];
    this.groups = [];
    this.flags = {};

    Object.assign(this, data);

    this.kindName = this.kindString;
    this.prettyName = prettyName(this.name);
  }
}

class GroupModel {
  
  constructor(data) {
    this.id = -1;
    this.kind = -1;
    this.kindName = '';
    this.title = '';
    this.children = [];

    Object.assign(this, data);

    this.kindName = this.kindString;
  }
}

class ClassModel {
  constructor(data) {
    this.comment = {};
    this.methods = [];
    this.groups = [];
    this.flags = {};
    this.properties = [];
    this.constructorMethod = {};

    Object.assign(this, data);

    this.kindName = this.kindString;
  }
}

class MethodModel {
  constructor(data) {
    this.signature = {};
    
    Object.assign(this, data);
    
    this.kindName = this.kindString;
  }
}

class ConstructorModel {
  constructor(data) {
    this.signature = {};
    
    Object.assign(this, data);

    this.kindName = this.kindString;
  }
}

class InterfaceModel {
  constructor(data) {
    this.classes = [];
    this.properties = [];
    this.variables = [];
    this.methods = [];

    Object.assign(this, data);

    this.kindName = this.kindString;
  }
}

class PropertyModel {
  constructor(data) {
    Object.assign(this, data);

    this.kindName = this.kindString;
  }
}

class SignatureModel {
  constructor(data) {
    this.comment = {};

    Object.assign(this, data);

    this.kindName = this.kindString;
  }
}

class VariableModel {
  constructor(data) {
    Object.assign(this, data);

    this.kindName = this.kindString;
  }
}

class FunctionModel {
  constructor(data) {
    Object.assign(this, data);
    
    this.kindName = this.kindString;
    this.signature = this.signatures[0];
  }
}
