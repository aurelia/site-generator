const fs = require('../file-system');
const path = require('path');
const {getMetadata, slugify} = require('../processors/article/article-parser');
const {ProcessorContext} = require('../processors/processor-context');
const {createPageRenderer} = require('../page-renderer');
const {writePost} = require('./write-post');
const {writePages} = require('./write-pages');
const {writeRSS} = require('./write-rss');
const {calculateBlogDest} = require('./calculate-blog-dest');
const {BlogProcessor} = require('./blog-processor');
const {ArticleGroupRootProcessor} = require('../processors/article/article-group-root-processor');
const {ArticleProcessor} = require('../processors/article/article-processor');

let hasProcessedArticles = false;

// au-site blog publish [file]/[--all] [--no-date]
exports.publishBlog = function(project, update, args) {
  var which = args[0];
  var updateDate = args[1] !== '--no-date';
  var sourceFolder = update ? 'published' : 'drafts';
  var task;

  if (which == '--all') {
    var folder = path.join(project.blog.src, sourceFolder);
    task = fs.readdir(folder).then(files => Promise.all(files.map(x => publish(project, sourceFolder, x, updateDate))));
  } else {
    task = publish(project, sourceFolder, which, updateDate);
  }

  return task.then(x => writePages(project))
      .then(x => writeRSS(project));
}

function publish(project, sourceFolder, srcPath, updateDate) {
  var blog = {
    src: path.join(project.blog.src, sourceFolder, srcPath)
  };

  return fs.readFile(blog.src).then(data => {
    var metadata = getMetadata(data);

    if (!metadata.publishedAt) {
      console.log(`Blog at ${blog.src} does not have publishedAt metadata. Picking current time.`);
      metadata.publishedAt = new Date();
    }

    if (!metadata.updatedAt || updateDate) {
      console.log(`Blog at ${blog.src} does not have updateAt metadata. Picking current time.`);
      metadata.updatedAt = new Date();
    }

    if (!metadata.slug) {
      metadata.slug = slugify(metadata.name);
    }

    blog.dest = calculateBlogDest(project, metadata);
    blog.name = metadata.name;
    blog.publishedAt = metadata.publishedAt;
    blog.updatedAt = metadata.updatedAt;
    blog.slug = metadata.slug;
    blog.description = metadata.description;
    blog.author = metadata.author;

    var context = new ProcessorContext(false);

    var work = [];

    if (!hasProcessedArticles) {
      hasProcessedArticles = true;

      if (project.docs && project.docs.article) {
        work.push(new ArticleGroupRootProcessor(project.docs.article, 'docs').process(context));
      }

      if (project.help) {
        work.push(new ArticleProcessor(project.help).process(context));
      }

      if (project.learn) {
        work.push(new ArticleProcessor(project.learn).process(context));
      }
    
      if (project.support) {
        work.push(new ArticleProcessor(project.support).process(context));
      }
    }

    return Promise.all(work)
      .then(() => {
        new BlogProcessor(blog, project)
          .process(context).then(writer => {
            let render = createPageRenderer(project);
            var dest = path.join(project.blog.src, 'published', srcPath);
      
            return writer.write(render, project.outDir)
              .then(() => writePost(project, blog, dest))
              .then(() => {
                if (blog.src !== dest) {
                  return fs.deleteFile(blog.src);
                }
              });
          });
      })
  });
}
