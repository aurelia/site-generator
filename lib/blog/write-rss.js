const path = require('path');
const fs = require('../file-system');
const {getAllPostMetadata} = require('./get-all-post-metadata');
const handlebars = require('handlebars');

const tempatePath = require.resolve('../templates/blog-rss.xml');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

exports.writeRSS = function(project) {
  return getAllPostMetadata(project)
    .then(posts => {
      posts.forEach(x => x.links.static = project.siteUrl + path.join(project.baseUrl, x.links.static));

      let feed = {
        title: 'The Aurelia Blog',
        link: path.join(project.siteUrl, project.baseUrl, project.blog.dest),
        description: 'The official blog of the Aurelia project.',
        buildDate: new Date(),
        items: posts.slice(0, 25)
      };

      let rssDest = path.join(project.outDir, project.blog.dest, 'rss/index.xml');

      return fs.writeFile(rssDest, template(feed));
    });
};
