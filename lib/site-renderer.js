const ArticleGroupRootProcessor = require('./processors/article/article-group-root-processor').ArticleGroupRootProcessor;
const APIGroupProcessor = require('./processors/api/api-group-processor').APIGroupProcessor;
const HomeProcessor = require('./processors/home/home-processor').HomeProcessor;
const ProcessorContext = require('./processors/processor-context').ProcessorContext;
const ArticleProcessor = require('./processors/article/article-processor').ArticleProcessor;
const NotFoundProcessor = require('./processors/404/404-processor').NotFoundProcessor;
const createPageRenderer = require('./page-renderer').createPageRenderer;
const path = require('path');
const fs = require('./file-system');

exports.generateSite = function(project) {
  let render = createPageRenderer(project);
  let processors = [
    new NotFoundProcessor(project)
  ];

  if (project.docs) {
    if (project.docs.article) {
      processors.push(new ArticleGroupRootProcessor(project.docs.article, 'docs'));   
    }

    if (project.docs.api) {
      processors.push(new APIGroupProcessor({ 
        name: 'APIs',
        items: project.docs.api,
        dest: 'docs/api'
      }));
    }
  }

  if (project.help) {
    processors.push(new ArticleProcessor(project.help));
  }

  if (project.home) {
    processors.push(new HomeProcessor(project.home));
  }

  return runProcessors(project, render, processors);
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
      fs.copyFolderRecursiveSync(imagePath, path.join(project.outDir, 'styles'));
      return fs.copy(project.logoSrc, path.join(project.outDir, `styles/images/logo${path.extname(project.logoSrc)}`));
    }).then(() => {
      if (project.search) {
        let searchIndexPath = path.join(project.outDir, 'scripts/search-index.json');
        return fs.writeFile(searchIndexPath, JSON.stringify(context.searchIndex));
      }
    }).then(() => Promise.all(context.images.data.map(x => fs.copy(x.src, x.dest, null))));
}
