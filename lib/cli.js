const path = require('path');
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
          console.error('Cannot fine an aurelia-docs.json configuration file.')
        } else {
          let articleProcessor = new ArticleGroupProcessor({ items: project.documentation.articles});
          
          return articleProcessor.process()
            .then(writer => writer.write(project.outDir))
            .then(() => {
              let apiProcessor = new APIGroupProcessor({ items: project.documentation.api });
              return apiProcessor.process();
            }).then(writer => writer.write(project.outDir));
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
