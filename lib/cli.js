const path = require('path');
const handlebars = require('handlebars');
const fs = require('./file-system');
const ArticleGroupProcessor = require('./article-group-processor').ArticleGroupProcessor;
const APIGroupProcessor = require('./api-group-processor').APIGroupProcessor;

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
          var tempatePath = require.resolve('./templates/index.html');
          var source = fs.readFileSync(tempatePath);
          var template = handlebars.compile(source);
          var baseTag = `<base href="${project.baseUrl}">`;
          var render = function(title, content) {
            let data = {
              title: title,
              content: content,
              baseTag: baseTag
            };

            return template(data);
          };

          let articleProcessor = new ArticleGroupProcessor({ items: project.docs.article});
          
          return articleProcessor.process()
            .then(writer => writer.write(render, project.outDir))
            .then(() => {
              let apiProcessor = new APIGroupProcessor({ items: project.docs.api });
              return apiProcessor.process();
            })
            .then(writer => writer.write(render, project.outDir))
            .then(() => {
              let scriptPath = require.resolve('./app/scripts/aurelia-docs.js');
              return fs.copy(scriptPath, path.join(project.outDir, 'scripts/aurelia-docs.js'));
            }).then(() => {
              let stylePath = require.resolve('./app/styles/aurelia-docs.css');
              fs.copy(stylePath, path.join(project.outDir, 'styles/aurelia-docs.css'));
            });
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
