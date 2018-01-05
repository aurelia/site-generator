const fs = require('../file-system');
const os = require('os');

exports.writePost = function(project, post, dest) {
  var output = writeMetadata(project, post);
  output += post.content;
  return fs.writeFile(dest, output);
};

function writeMetadata(project, post) {
  var output = writeLine('---');
  
  output += writeLine(`name: ${post.title || post.name}`);
  output += writeLine(`slug: ${post.slug}`);
  output += writeLine(`updatedAt: ${post.updated_at || post.updatedAt.toISOString()}`);
  output += writeLine(`publishedAt: ${post.published_at || post.publishedAt.toISOString()}`);
  output += writeLine(`author: ${post.author || project.blog.author}`);

  output += writeLine('---');

  return output;
}

function writeLine(line) {
  return line + os.EOL;
}
