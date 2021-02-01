const path = require('path');

exports.calculateBlogDest = function(project, metadata) {
  const date = new Date(metadata.publishedAt);
  let formattedDate = date.getUTCFullYear() + '/' +
                      // January gives 0
                      (date.getUTCMonth() + 1) + '/' +
                      date.getUTCDate();

  return path.join(
    project.blog.dest,
    formattedDate,
    metadata.slug
  );
}
