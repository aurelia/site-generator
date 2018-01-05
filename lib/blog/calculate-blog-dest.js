const path = require('path');

exports.calculateBlogDest = function(project, metadata) {
  return path.join(
    project.blog.dest, 
    metadata.publishedAt.getUTCFullYear().toString(),
    (metadata.publishedAt.getUTCMonth() + 1).toString(),
    (metadata.publishedAt.getUTCDay() + 1).toString(),
    metadata.slug
  );
}
