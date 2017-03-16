const path = require('path');
const handlebars = require('handlebars');
const fs = require('../file-system');

const tempatePath = require.resolve('../templates/home.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.HomeProcessor = class {
  constructor(home) {
    this.home = home;
  }

  process() {
    return Promise.resolve(new HomeWriter(this.home));
  }
}

class HomeWriter {
  constructor(home) {
    this.home = home;
  }

  write(render, outDir) {
    let html = template({});
    let json = createJSON(this.home);

    const htmlDest = path.join(outDir, json.links.html);
    const htmlFragmentDest = path.join(outDir, json.links.fragment);
    const jsonDest = path.join(outDir, json.links.self);

    return fs.writeFile(htmlDest, render(json.name, html))
      .then(() => fs.writeFile(path.join(outDir, 'index.html'), render(json.name, html)))
      .then(() => fs.writeFile(htmlFragmentDest, html))
      .then(() => fs.writeFile(path.join(outDir, 'index-fragment.html'), html))
      .then(() => fs.writeFile(jsonDest, JSON.stringify(json)))
      .then(() => fs.writeFile(path.join(outDir, 'index.json'), JSON.stringify(json)))
  }
}

function createJSON(home){
  return {
    name: 'Home',
    links: {
      static: home.dest,
      html: path.join(home.dest, 'index.html'),
      fragment: path.join(home.dest, 'index-fragment.html'),
      self: path.join(home.dest, 'index.json')
    }
  }
}
