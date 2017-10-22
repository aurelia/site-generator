const path = require('path');
const handlebars = require('handlebars');
const fs = require('../../file-system');

const tempatePath = require.resolve('../../templates/home.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.HomeProcessor = class {
  constructor(home) {
    this.home = home;
  }

  process(context) {
    return Promise.resolve(new HomeWriter(this.home, context));
  }
}

class HomeWriter {
  constructor(home, context) {
    this.model = home;
    this.context = context;
  }

  write(render, outDir) {
    const json = createJSON(this.model, this.context);
    const html = template(json);

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
    name: 'Home',
    description: 'Aurelia is a JavaScript client framework for web, mobile and desktop that leverages simple conventions to empower your creativity.',
    featured: context.featured.data,
    links: {
      static: home.dest,
      html: path.join(home.dest, 'index.html'),
      fragment: path.join(home.dest, 'index-fragment.html'),
      self: path.join(home.dest, 'index.json')
    }
  }
}
