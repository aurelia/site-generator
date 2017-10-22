const path = require('path');
const handlebars = require('handlebars');
const fs = require('../../file-system');

const templatePath = require.resolve('../../templates/404.html');
const source = fs.readFileSync(templatePath);
const template = handlebars.compile(source);

exports.NotFoundProcessor = class {
  constructor(notFound) {
    this.notFound = notFound;
  }

  process(context) {
    return Promise.resolve(new NotFoundWriter(this.notFound, context));
  }
}

class NotFoundWriter {
  constructor(notFound, context) {
    this.model = notFound;
    this.context = context;
  }

  write(render, outDir) {
    const html = template(this.model);

    const htmlDest = path.join(outDir, '404.html');
    const htmlFragmentDest = path.join(outDir, '404-fragment.html');

    return Promise.all([
      fs.writeFile(htmlDest, addFrontMatterToPage(render(this.model, html))),
      fs.writeFile(htmlFragmentDest, html)
    ]);
  }
}

function addFrontMatterToPage(content) {
  return 
`---
permalink: /404.html
---
${content}`;
}
