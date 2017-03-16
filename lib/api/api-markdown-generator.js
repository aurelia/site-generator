const handlebars = require('handlebars');
const fs = require('../file-system');

const path = require.resolve('../templates/api.md')
const source = fs.readFileSync(path);
const template = handlebars.compile(source);

exports.APIMarkdownGenerator = class {
  generate(model) {
    return template(model);
  }
}
