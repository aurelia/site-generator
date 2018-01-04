// aurelia-docs blog publish [file] [--all]
exports.publishBlog = function(project, args) {
  var which = args[0];

  if (which == '--all') {
    //publish all blogs in drafts folder
  } else {
    //which refers to a specific file in the drafts folder
  }
}

// * Moves a Markdown file from "drafts" to "published"
// * Encodes the published date (if not present)
// * Encodes the updated date (if not present; defaults to publish date)
// * Generates a description if one is not present
// * Generates the HTML for the Post
// * Updates the Blog Index pages
// * Updates the Blog RSS

function publish(project, srcPath) {
  
}
