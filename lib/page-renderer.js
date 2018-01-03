const handlebars = require('handlebars');
const fs = require('./file-system');

exports.createPageRenderer = function(project) {
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
