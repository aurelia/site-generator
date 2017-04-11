const path = require('path');
const handlebars = require('handlebars');
const fs = require('../file-system');

const tempatePath = require.resolve('../templates/discuss.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.DiscussProcessor = class {
  constructor(discuss) {
    this.discuss = discuss;
  }

  process() {
    return Promise.resolve(new DiscussWriter(this.discuss));
  }
}

class DiscussWriter {
  constructor(discuss) {
    this.discuss = discuss;
  }

  write(render, outDir) {
    let html = template(this.discuss);
    let json = createJSON(this.discuss);

    const htmlDest = path.join(outDir, json.links.html);
    const htmlFragmentDest = path.join(outDir, json.links.fragment);
    const jsonDest = path.join(outDir, json.links.self);

    return fs.writeFile(htmlDest, render(json.name, html))
      .then(() => fs.writeFile(htmlFragmentDest, html))
      .then(() => fs.writeFile(jsonDest, JSON.stringify(json)));
  }
}

function createJSON(discuss){
  return {
    name: 'Discuss',
    links: {
      static: discuss.dest,
      html: path.join(discuss.dest, 'index.html'),
      fragment: path.join(discuss.dest, 'index-fragment.html'),
      self: path.join(discuss.dest, 'index.json')
    }
  }
}
