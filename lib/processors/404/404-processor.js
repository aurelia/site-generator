const path = require('path');
const handlebars = require('handlebars');
const fs = require('../../file-system');

const templatePath = require.resolve('../../templates/404.html');
const source = fs.readFileSync(templatePath);
const template = handlebars.compile(source);

exports.NotFoundProcessor = class {
  constructor(project) {
    this.project = project;
  }

  process(context) {
    return Promise.resolve(new NotFoundWriter(this.project, context));
  }
}

class NotFoundWriter {
  constructor(project, context) {
    this.project = project;
    this.model = project.notFound;
    this.context = context;
  }

  write(render, outDir) {
    const model = Object.assign({}, { search: this.project.search }, this.model);
    const html = template(model); 

    const htmlDest = path.join(outDir, '404.html');
    const htmlFragmentDest = path.join(outDir, '404-fragment.html');

    return Promise.all([
      fs.writeFile(htmlDest, addFrontMatterToPage(render(this.model, html))),
      fs.writeFile(htmlFragmentDest, html)
    ]);
  }
}

function addFrontMatterToPage(content) {
  let result = 
`---
permalink: /404.html
---
${content}`;

  return result;
}
