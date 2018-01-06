// aurelia-docs blog update [file] [--all] [--no-date]
exports.updateBlog = function(project, args) {
  var which = args[0];
  var updateDate = args[1] !== '--no-date';
  var task;

  if (which == '--all') {
    var folder = path.join(project.blog.src, 'published');
    fs.readdir(folder).then(files => Promise.all(files.map(x => updateBlog(project, x, updateDate))));
  } else {
    task = updateBlog(project, which, updateDate);
  }

  return task.then(x => writePages(project))
      .then(x => writeRSS(project));
}

// * Encodes the updated date (unless --no-date)
// * Generates a description if one is not present
// * Generates the HTML for the Post

function updateBlog(project, srcPath) {
  
}
