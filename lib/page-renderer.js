const handlebars = require('handlebars');
const fs = require('./file-system');
const path = require('path');

handlebars.registerPartial(
  'functionOrMethod', 
  fs.readFileSync(require.resolve('./templates/partial-functionOrMethod.html')).toString()
  );

handlebars.registerPartial(
  'constantOrProperty', 
  fs.readFileSync(require.resolve('./templates/partial-constantOrProperty.html')).toString()
  );

handlebars.registerHelper('formatDate', function(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] + ' ' + day + ', ' + year;
});

exports.createPageRenderer = function(project) {
  const tempatePath = require.resolve('./templates/index.html');
  const source = fs.readFileSync(tempatePath);
  const template = handlebars.compile(source);
  const baseTag = `<base href="${project.baseUrl}">`;
  const logoSrc = `styles/images/logo${path.extname(project.appearance.logoSrc)}`;

  return function(model, content) {
    let data = {
      model: model,
      title: model.name,
      description: getDescription(model),
      content: content,
      baseTag: baseTag,
      project: project,
      projectJSON: JSON.stringify(project),
      trackingID: project.trackingID,
      logoSrc: logoSrc
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
