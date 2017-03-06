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

    var json = {
      groups: simpleGraph.groups,
      children: simpleGraph.children
    }

    return {
      markdown: "",
      html: "",
      json: JSON.stringify(json, null, '\t')
    }
  }
}
