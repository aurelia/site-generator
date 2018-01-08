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
  var json = createJSON(project, posts, pageNumber, pageCount);
  var model = Object.assign({}, json);

  model.isFirstPage = model.pageNumber === 1;
  model.hasNextPage = model.pageNumber < model.pageCount;
  model.hasPrevPage = model.pageNumber > 1;

  var outDir = project.outDir;
  let render = createPageRenderer(project);
  let html = template(model);

  const htmlDest = path.join(outDir, json.links.html);
  const htmlFragmentDest = path.join(outDir, json.links.fragment);
  const jsonDest = path.join(outDir, json.links.self);

  return Promise.all([
    fs.writeFile(htmlDest, render(model, html)),
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
    name: pageNumber === 1 ? project.blog.name : `${project.blog.name} - Page ${pageNumber}`,
    description: project.blog.description,
    pageNumber: pageNumber,
    pageCount: pageCount,
    links: createLinks(dest),
    posts: posts
  };

  if (pageNumber > 1) {
    var prevPageNumber = pageNumber - 1;
    var prev;

    if (prevPageNumber === 1) {
      prev = project.blog.dest;
    } else {
      prev = path.join(project.blog.dest, `page/${prevPageNumber}`);
    }

    json.links.prev = createLinks(prev);
  }

  if (pageNumber < pageCount) {
    var next = path.join(project.blog.dest, `page/${pageNumber + 1}`);
    json.links.next = createLinks(next);
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
