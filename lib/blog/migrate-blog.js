const commonmark = require('commonmark');
const path = require('path');
const fs = require('../file-system');
const {writePost} = require('./write-post');

const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

exports.migrateBlog = function(project) {
  return fs.readFile(project.blog.migration.src).then(raw => {
    var data = JSON.parse(raw.toString()).db[0].data;
    var posts = data.posts;
    return Promise.all(posts.map(x => {
      x.content = processMarkdown(x.markdown);
      return writePost(project, x, path.join(project.blog.migration.dest, x.slug + '.md'));
    }));
  });
}

function processMarkdown(markdown) {
  var lines = markdown.split(`\n`);
  var inCodeBlock = false;
  var lang = '';
  var output = '';
  var code = '';

  for(let i = 0; i < lines.length; ++i) {
    let current = lines[i];

    if (current.indexOf('```') == 0) {
      if (inCodeBlock) {
        output += '\n' + `<code-listing>
  <source-code lang="${lang}">${code}
  </source-code>
</code-listing>` 
        inCodeBlock = false;
      } else {
        lang = lookupLanguage(current.replace('```', '').trim());
        code = '';
        inCodeBlock = true;
      }
    } else if (inCodeBlock) {
      code += '\n' + '    ' + current;
    } else {
      output += '\n' + current;
    }
  }

  return output;
}

function lookupLanguage(lang) {
  var caseless = lang ? lang.toLowerCase() : 'javascript';

  switch(caseless) {
    case 'typescript':
    case 'ts':
      return 'TypeScript';
    case 'html':
      return 'HTML';
    case 'shell':
      return 'Shell';
    default:
      return 'JavaScript';
  }
}
