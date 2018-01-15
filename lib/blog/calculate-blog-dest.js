const path = require('path');
const dateformat = require('dateformat');

exports.calculateBlogDest = function(project, metadata) {
  let formattedDate = dateformat(metadata.publishedAt, 'yyyy/mm/dd');

  return path.join(
    project.blog.dest, 
    formattedDate,
    metadata.slug
  );
}
