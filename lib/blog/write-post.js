const fs = require('../file-system');
const os = require('os');

exports.writePost = function(project, post, dest) {
  var output = writeMetadata(project, post);
  output += post.content;
  return fs.writeFile(dest, output);
};

function writeMetadata(project, post) {
  var output = writeLine('---');
  
  var name = post.title || post.name;

  if (name.indexOf(':') !== -1) {
    output += writeLine(`name: "${name}"`);
  } else {
    output += writeLine(`name: ${name}`);
  }

  output += writeLine(`slug: ${post.slug}`);

  if (post.description) {
    output += writeLine(`description: |`);
    output += writeLine(`  ${post.description.trim()}`);
  }

  if (post.updated_at || post.updatedAt) {
    output += writeLine(`updatedAt: ${post.updated_at || post.updatedAt.toISOString()}`);
  }

  if (post.published_at || post.publishedAt) {
    output += writeLine(`publishedAt: ${post.published_at || post.publishedAt.toISOString()}`);
  }

  output += writeLine(`author: ${post.author || project.blog.author}`);
  output += writeLine('---');

  return output;
}

function writeLine(line) {
  return line + os.EOL;
}
