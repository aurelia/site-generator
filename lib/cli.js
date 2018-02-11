const path = require('path');
const fs = require('./file-system');
const generateSite = require('./site-renderer').generateSite;
const migrateBlog = require('./blog/migrate-blog').migrateBlog;
const publishBlog = require('./blog/publish-blog').publishBlog;

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
          console.error('Cannot find an au-site.json configuration file.')
        } else {
          switch (command) {
            case 'generate':
              return generateSite(project);
            case 'blog':
              var subcommand = args[0];
              var subargs = args.slice(1);

              switch(subcommand) {
                case 'migrate':
                  return migrateBlog(project);
                case 'publish':
                  return publishBlog(project, false, subargs);
                case 'update':
                  return publishBlog(project, true, subargs);
              }

              return Promise.resolve();
            default:
              throw new Error('Invalid Command');
          }
        }
      });
  }

  _establishProject(options) {
    let configurationPath = path.join(process.cwd(), 'au-site.json');

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
