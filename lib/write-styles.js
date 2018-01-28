const path = require('path');
const fs = require('./file-system');

exports.writeStyles = function(project) {
  let stylePath = require.resolve('./app/styles/aurelia-docs.css');

  return fs.readFile(stylePath).then(data => {
    if (project.appearance && project.appearance.variableOverrides) {
      return modifyVariableValues(project.appearance.variableOverrides, data.toString())
        .then(content => writeStyles(project, content))
    }
    
    return writeStyles(project, data.toString());
  });
};

function writeStyles(project, content) {
  return fs.writeFile(path.join(project.outDir, 'styles/aurelia-docs.css'), content);
}

function modifyVariableValues(variableOverrides, styleContent) {
  let sassVariablesPath = require.resolve('./app/sass/_variables.scss');

  return fs.readFile(sassVariablesPath).then(data => {
    let variableOriginals = buildVariablesMapFromSassContent(data.toString());

    Object.keys(variableOverrides).forEach(key => {
      let originalValue = variableOriginals[key];
      let overrideValue = variableOverrides[key];
      styleContent = replaceAll(styleContent, originalValue, overrideValue);
    });

    return styleContent;
  });
}

function buildVariablesMapFromSassContent(sassContent) {
  let variableMatcher = /([\$A-Za-z\-]*)\s*:\s*([#A-Za-z\-0-9\(\),\s.]*);/g;
  let match = variableMatcher.exec(sassContent);
  let map = {};

  while (match != null) {
    map[match[1].trim()] = match[2].trim();
    match = variableMatcher.exec(sassContent);
  }

  return map
}

function replaceAll(text, search, replacement) {
  return text.split(search).join(replacement);
}
