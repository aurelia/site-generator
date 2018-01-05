const path = require('path');
const fs = require('../file-system');
const {getMetadata} = require('../processors/article/article-parser');
const {calculateBlogDest} = require('./calculate-blog-dest');

exports.getAllPostMetadata = function(project) {
  var publishedPath = path.join(project.blog.src, 'published');

  return wait(500) //HACK: Files may not have finished writing. Why?
    .then(() => fs.readdir(publishedPath))
    .then(files => {
      return Promise.all(files.map(x => fs.readFile(path.join(publishedPath, x)).then(data => getMetadata(data.toString())))); //read metadata
    }).then(posts => {
      posts.sort((a, b) => b.publishedAt - a.publishedAt); //sort date descending
      return posts.map(x => generatePostLinks(project, x));
    });
};

function generatePostLinks(project, metadata) {
  var dest = calculateBlogDest(project, metadata);

  metadata.links = {
    static: dest,
    html: path.join(dest, 'index.html'),
    fragment: path.join(dest, 'index-fragment.html'),
    self: path.join(dest, 'index.json')
  };

  return metadata;
}

function wait(time) {
  return new Promise((resolve, reject) => setTimeout(resolve, time));
}
