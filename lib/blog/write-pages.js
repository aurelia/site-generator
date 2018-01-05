const path = require('path');
const fs = require('../file-system');
const {getAllPostMetadata} = require('./get-all-post-metadata');
const {createPageRenderer} = require('../page-renderer');
const handlebars = require('handlebars');

const tempatePath = require.resolve('../templates/blog-list.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.writePages = function(project) {
  return getAllPostMetadata(project)
    .then(posts => {
      let pageSize = project.blog.postsPerPage || 10;
      let pageCount = Math.ceil(posts.length / pageSize);
      let work = [];

      for (let i = 0, pageNumber = 1; i < posts.length; i += pageSize, pageNumber++) {
        work.push(writePage(project, posts.slice(i, i + pageSize), pageNumber, pageCount));
      }

      return Promise.all(work);
    });
}

function writePage(project, posts, pageNumber, pageCount) {
  var outDir = project.outDir;
  var json = createJSON(project, posts, pageNumber, pageCount);
  let render = createPageRenderer(project);
  let html = template(json);

  const htmlDest = path.join(outDir, json.links.html);
  const htmlFragmentDest = path.join(outDir, json.links.fragment);
  const jsonDest = path.join(outDir, json.links.self);

  return Promise.all([
    fs.writeFile(htmlDest, render(json, html)),
    fs.writeFile(htmlFragmentDest, html),
    fs.writeFile(jsonDest, JSON.stringify(json))
  ]);
}

function createJSON(project, posts, pageNumber, pageCount){
  var dest;
  
  if (pageNumber === 1) {
    dest = project.blog.dest;
  } else {
    dest = path.join(project.blog.dest, `page/${pageNumber}`);
  }

  var json = {
    name: `Blog Page ${pageNumber}`,
    description: `Blog Page ${pageNumber}`,
    pageNumber: pageNumber,
    pageCount: pageCount,
    links: createLinks(dest),
    posts: posts
  };

  if (pageNumber > 1) {
    var next = path.join(project.blog.dest, `page/${pageNumber - 1}`);
    json.links.next = createLinks(next);
  }

  if (pageNumber < pageCount) {
    var prev = path.join(project.blog.dest, `page/${pageNumber + 1}`);
    json.links.prev = createLinks(prev);
  }

  return json;
}

function createLinks(dest) {
  return {
    static: dest,
    html: path.join(dest, 'index.html'),
    fragment: path.join(dest, 'index-fragment.html'),
    self: path.join(dest, 'index.json')
  };
}
