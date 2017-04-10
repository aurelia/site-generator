const path = require('path');
const handlebars = require('handlebars');
const fs = require('./file-system');
const ArticleGroupRootProcessor = require('./article/article-group-root-processor').ArticleGroupRootProcessor;
const APIGroupProcessor = require('./api/api-group-processor').APIGroupProcessor;
const HomeProcessor = require('./home/home-processor').HomeProcessor;
const DiscussProcessor = require('./discuss/discuss-processor').DiscussProcessor;
const BlogProcessor = require('./blog/blog-processor').BlogProcessor;
const ProcessorContext = require('./processor-context').ProcessorContext;

exports.CLI = class { 
  constructor() {
    this.options = {};
  }
  
  run(command, args) {
    if (command === '--version' || command === '-v') {
      console.log(require('../package.json').version);
      return Promise.resolve();
    }

    return this._establishProject(this.options)
      .then(project => {
        if (!project) {
          console.error('Cannot find an aurelia-docs.json configuration file.')
        } else {
          let render = createPageRenderer(project);
          let processors = [
            new ArticleGroupRootProcessor(project.docs.article, 'docs/article'),
            new APIGroupProcessor({ 
              name: 'APIs',
              items: project.docs.api,
              dest: 'docs/api'
            }),
            new DiscussProcessor(project.discuss),
            new BlogProcessor(project.blog),
            new HomeProcessor(project.home)
          ];

          return runProcessors(project, render, processors);
        }
      });
  }

  _establishProject(options) {
    let configurationPath = path.join(process.cwd(), 'aurelia-docs.json');

    return fs.exists(configurationPath).then(result => {
      if (result) {
        return fs.readFile(configurationPath).then(data => {
          return JSON.parse(data.toString());
        })
      } else {
        return null;
      }
    });
  }
}

function createPageRenderer(project) {
  var tempatePath = require.resolve('./templates/index.html');
  var source = fs.readFileSync(tempatePath);
  var template = handlebars.compile(source);
  var baseTag = `<base href="${project.baseUrl}">`;

  return function(title, content) {
    let data = {
      title: title,
      content: content,
      baseTag: baseTag,
      project: JSON.stringify(project)
    };

    return template(data);
  };
}

function runProcessors(project, render, processors) {
  let context = new ProcessorContext();

  return Promise.all(processors.map(p => p.process(context)))
    .then(writers => Promise.all(writers.map(w => w.write(render, project.outDir))))
    .then(() => {
      let scriptPath = require.resolve('./app/scripts/aurelia-docs.js');
      return fs.copy(scriptPath, path.join(project.outDir, 'scripts/aurelia-docs.js'));
    }).then(() => {
      let stylePath = require.resolve('./app/styles/aurelia-docs.css');
      return fs.copy(stylePath, path.join(project.outDir, 'styles/aurelia-docs.css'));
    }).then(() => {
      let stylePath = require.resolve('./app/styles/aurelia-docs.css');
      let imagePath = stylePath.replace('aurelia-docs.css', 'images');
      fs.copyFolderRecursiveSync(imagePath, path.join(project.outDir, 'styles'))
    }).then(() => {
      let searchIndexPath = path.join(project.outDir, 'scripts/search-index.json');
      return fs.writeFile(searchIndexPath, JSON.stringify(context.searchIndex));
    });
}
