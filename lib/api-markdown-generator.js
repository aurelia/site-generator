const handlebars = require('handlebars');
const fs = require('./file-system');

var path = require.resolve('./api-markdown-template.md')
var source = fs.readFileSync(path);
var template = handlebars.compile(source);

exports.APIMarkdownGenerator = class {
  generate(model) {
    return template(model);
  }
}
