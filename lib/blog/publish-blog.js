const fs = require('../file-system');
const path = require('path');
const os = require('os');
const {ArticleParser, getMetadata, slugify} = require('../processors/article/article-parser');
const {ProcessorContext} = require('../processors/processor-context');
const {createPageRenderer} = require('../page-renderer');
const {writePost} = require('./write-post');
const {writePages} = require('./write-pages');
const {writeRSS} = require('./write-rss');
const {calculateBlogDest} = require('./calculate-blog-dest');
const handlebars = require('handlebars');
const commonmark = require('commonmark');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

const tempatePath = require.resolve('../templates/blog-detail.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

// aurelia-docs blog publish [file] [--all]
exports.publishBlog = function(project, args) {
  var which = args[0];
  var task;

  if (which == '--all') {
    //publish all blogs in drafts folder
  } else {
    task = publish(project, which);
  }

  return task.then(x => writePages(project))
      .then(x => writeRSS(project));
}

function publish(project, srcPath) {
  var blog = {
    src: path.join(project.blog.src, 'drafts', srcPath)
  };

  return fs.readFile(blog.src).then(data => {
    var metadata = getMetadata(data);

    if (!metadata.publishedAt) {
      metadata.publishedAt = new Date();
    }

    if (!metadata.updatedAt) {
      metadata.updatedAt = new Date();
    }

    if (!metadata.slug) {
      metadata.slug = slugify(metadata.name);
    }

    blog.dest = calculateBlogDest(project, metadata);

    var context = new ProcessorContext();
    var processor = new BlogProcessor(blog);

    processor.process(context).then(writer => {
      let render = createPageRenderer(project);

      blog.name = metadata.name;
      blog.publishedAt = metadata.publishedAt;
      blog.updatedAt = metadata.updatedAt;
      blog.slug = metadata.slug;
      blog.description = metadata.description || blog.description;

      return writer.write(render, project.outDir)
        .then(() => writePost(project, blog, path.join(project.blog.src, 'published', srcPath)))
        .then(() => fs.deleteFile(blog.src));
    });
  });
}

const BlogProcessor = exports.BlogProcessor = class {
  constructor(blog) {
    this.blog = blog;
  }

  process(context) {
    return fs.readFile(this.blog.src).then(data => {
      const reader = new ArticleParser(this.blog, data.toString(), template);
      const result = reader.parse(context);

      this.blog.content = result.content;
      this.blog.description = getDescription(result.content);
      
      const json = createJSON(this.blog, result.metadata, result.content);
      
      return new BlogWriter(this.blog, json, result.html);
    });
  }
}

function getDescription(content) {
  var index = content.indexOf('#');
  var markup = content.substring(0, index);
  return writer.render(reader.parse(markup));
}

class BlogWriter {
  constructor(model, json, html) {
    this.model = model;
    this.json = json;
    this.html = html;
  }

  write(render, outDir) {
    const htmlDest = path.join(outDir, this.json.links.html);
    const htmlFragmentDest = path.join(outDir, this.json.links.fragment);
    const jsonDest = path.join(outDir, this.json.links.self);

    return Promise.all([
      fs.writeFile(htmlDest, render(this.json, this.html)),
      fs.writeFile(htmlFragmentDest, this.html),
      fs.writeFile(jsonDest, JSON.stringify(this.json))
    ]);
  }
}

function createJSON(model, metadata, content){
  return {
    name: model.name || metadata.name,
    description: model.description || metadata.description,
    author: metadata.author,
    links: {
      static: model.dest,
      html: path.join(model.dest, 'index.html'),
      fragment: path.join(model.dest, 'index-fragment.html'),
      self: path.join(model.dest, 'index.json')
    },
    content: content
  }
}
