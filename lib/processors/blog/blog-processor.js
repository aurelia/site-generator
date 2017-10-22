const path = require('path');
const handlebars = require('handlebars');
const fs = require('../../file-system');

const tempatePath = require.resolve('../templates/blog.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.BlogProcessor = class {
  constructor(blog) {
    this.blog = blog;
  }

  process() {
    return Promise.resolve(new BlogWriter(this.blog));
  }
}

class BlogWriter {
  constructor(blog) {
    this.blog = blog;
  }

  write(render, outDir) {
    let html = template({});
    let json = createJSON(this.blog);

    const htmlDest = path.join(outDir, json.links.html);
    const htmlFragmentDest = path.join(outDir, json.links.fragment);
    const jsonDest = path.join(outDir, json.links.self);

    return fs.writeFile(htmlDest, render(json, html))
      .then(() => fs.writeFile(htmlFragmentDest, html))
      .then(() => fs.writeFile(jsonDest, JSON.stringify(json)));
  }
}

function createJSON(blog){
  return {
    name: 'Blog',
    description: 'The official Aurelia blog',
    links: {
      static: blog.dest,
      html: path.join(blog.dest, 'index.html'),
      fragment: path.join(blog.dest, 'index-fragment.html'),
      self: path.join(blog.dest, 'index.json')
    }
  }
}
