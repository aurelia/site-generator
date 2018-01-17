const path = require('path');
const handlebars = require('handlebars');
const fs = require('../../file-system');

exports.HomeProcessor = class {
  constructor(home) {
    this.home = home;
  }

  process(context) {
    return fs.readFile(this.home.src).then(templateData => {
      console.log(`Processing Home`);

      const template = handlebars.compile(templateData.toString());

      return new HomeWriter(this.home, context, template);
    });
  }
}

class HomeWriter {
  constructor(home, context, template) {
    this.model = home;
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
      fs.writeFile(path.join(outDir, 'index.html'), render(json, html)),
      fs.writeFile(htmlFragmentDest, html),
      fs.writeFile(path.join(outDir, 'index-fragment.html'), html),
      fs.writeFile(jsonDest, JSON.stringify(json)),
      fs.writeFile(path.join(outDir, 'index.json'), JSON.stringify(json))
    ]);
  }
}

function createJSON(home, context) {
  return {
    name: home.name,
    description: home.description,
    featured: context.featured.data,
    links: {
      static: home.dest,
      html: path.join(home.dest, 'index.html'),
      fragment: path.join(home.dest, 'index-fragment.html'),
      self: path.join(home.dest, 'index.json')
    }
  }
}
