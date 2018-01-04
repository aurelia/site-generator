const fs = require('../file-system');
const path = require('path');
const os = require('os');

exports.migrate = function(project) {
  return fs.readFile(project.blog.migration.src).then(raw => {
    var data = JSON.parse(raw.toString()).db[0].data;
    var posts = data.posts;
    return Promise.all(posts.map(x => writePost(project, x)));
  });
}

var logged = false;

function writePost(project, post) {
  var output = writeMetadata(post);
  output += post.markdown;
  var destination = path.join(project.blog.migration.dest, post.slug + '.md');
  return fs.writeFile(destination, output);
}

function writeMetadata(post) {
  var output = writeLine('---');
  
  output += writeLine(`name: ${post.title}`);
  output += writeLine(`slug: ${post.slug}`);
  output += writeLine(`updatedAt: ${post.updated_at}`);
  output += writeLine(`publishedAt: ${post.published_at}`);
  output += writeLine('author: Rob Eisenberg (http://robeisenberg.com)');

  output += writeLine('---');

  return output;
}

function writeLine(line) {
  return line + os.EOL;
}
