const path = require('path');
const handlebars = require('handlebars');
const fs = require('../../file-system');

exports.DefaultProcessor = class {
  constructor(page) {
    this.page = page;
  }

  process(context) {
    return fs.readFile(this.page.src).then(templateData => {
      console.log(`Processing Page ${this.page.name}`);
      const template = handlebars.compile(templateData.toString());
      return new PageWriter(this.page, context, template);
    });
  }
}

class PageWriter {
  constructor(page, context, template) {
    this.model = page;
    this.context = context;
    this.template = template;
  }

  write(render, outDir) {
    const json = createJSON(this.model, this.context);
    const html = this.template(json);

    const htmlDest = path.join(outDir, json.links.html);
    const htmlFragmentDest = path.join(outDir, json.links.fragment);
    const jsonDest = path.join(outDir, json.links.self);

    return Promise.all([
      fs.writeFile(htmlDest, render(json, html)),
      fs.writeFile(htmlFragmentDest, html),
      fs.writeFile(jsonDest, JSON.stringify(json)),
    ]);
  }
}

function createJSON(page, context) {
  return {
    name: page.name,
    description: page.description,
    featured: context.featured.data,
    links: {
      static: page.dest,
      html: path.join(page.dest, 'index.html'),
      fragment: path.join(page.dest, 'index-fragment.html'),
      self: path.join(page.dest, 'index.json')
    }
  }
}
