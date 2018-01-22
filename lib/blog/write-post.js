const fs = require('../file-system');
const os = require('os');
const yaml = require('js-yaml');

exports.writePost = function(project, post, dest) {
  var output = writeMetadata(project, post);
  output += post.content.trim();
  return fs.writeFile(dest, output);
};

function writeMetadata(project, post) {
  var metadata = {
    name: post.title || post.name,
    slug: post.slug,
    author: post.author || project.blog.author
  };

  if (post.description) {
    metadata.description = post.description;
  }

  if (post.updated_at || post.updatedAt) {
    metadata.updatedAt = post.updated_at || post.updatedAt.toISOString();
  }

  if (post.published_at || post.publishedAt) {
    metadata.publishedAt = post.published_at || post.publishedAt.toISOString();
  }

  var output = writeLine('---');
  output += yaml.safeDump(metadata);
  output += writeLine('---');
  return output;
}

function getSafeValue(value) {
  value = value.trim();

  if (value.indexOf(':') !== -1 || value.indexOf('\'' !== -1 || value.indexOf('"') !== -1)) {
    return `"${value}"`;
  } else {
    return value;
  }
}

function writeLine(line) {
  return line + os.EOL;
}
