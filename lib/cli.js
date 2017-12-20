const path = require('path');
const handlebars = require('handlebars');
const fs = require('./file-system');
const ArticleGroupRootProcessor = require('./processors/article/article-group-root-processor').ArticleGroupRootProcessor;
const APIGroupProcessor = require('./processors/api/api-group-processor').APIGroupProcessor;
const HomeProcessor = require('./processors/home/home-processor').HomeProcessor;
const ProcessorContext = require('./processors/processor-context').ProcessorContext;
const ArticleProcessor = require('./processors/article/article-processor').ArticleProcessor;
const NotFoundProcessor = require('./processors/404/404-processor').NotFoundProcessor;

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
            new ArticleGroupRootProcessor(project.docs.article, 'docs'),
            new APIGroupProcessor({ 
              name: 'APIs',
              items: project.docs.api,
              dest: 'docs/api'
            }),
            new ArticleProcessor(project.help),
            new HomeProcessor(project.home),
            new NotFoundProcessor(project.notFound)
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
  handlebars.registerPartial(
    'functionOrMethod', 
    fs.readFileSync(require.resolve('./templates/partial-functionOrMethod.html')).toString()
    );

  handlebars.registerPartial(
    'constantOrProperty', 
    fs.readFileSync(require.resolve('./templates/partial-constantOrProperty.html')).toString()
    );

  var tempatePath = require.resolve('./templates/index.html');
  var source = fs.readFileSync(tempatePath);
  var template = handlebars.compile(source);
  var baseTag = `<base href="${project.baseUrl}">`;

  return function(model, content) {
    let data = {
      model: model,
      title: model.name,
      description: getDescription(model),
      content: content,
      baseTag: baseTag,
      project: JSON.stringify(project),
      trackingID: project.trackingID
    };

    return template(data);
  };
}

function getDescription(model) {
  if (model.description) {
    return model.description;
  }

  if (model.comment) {
    return model.comment.shortText;
  }

  if (model.signatures && model.signatures[0] && model.signatures[0] && model.signatures[0].comment) {
    return model.signatures[0].comment.shortText;
  }

  if (model.kindString) {
    return model.kindString;
  }

  console.log(`No description for ${model.name}.`);

  return '';
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
    }).then(() => Promise.all(context.images.data.map(x => fs.copy(x.src, x.dest, null))));
}
