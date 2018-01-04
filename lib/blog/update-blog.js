// aurelia-docs blog update [file] [--all] [--no-date]
exports.updateBlog = function(project, args) {
  var which = args[0];

  if (which == '--all') {
    //update all blogs in published folder
  } else {
    //which refers to a specific file in the published folder
  }

  var updateDate = args[1] !== '--no-date';


}

// * Encodes the updated date (unless --no-date)
// * Generates a description if one is not present
// * Generates the HTML for the Post
// * Updates the Blog Index pages
// * Updates the Blog RSS

function updateBlog(project, srcPath) {
  
}
