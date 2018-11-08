const path = require('path');
const fs = require('fs');
const getMetadata = require('./processors/article/article-parser').getMetadata;

exports.buildToC = function(project) { 
  if (!project.docs || !project.docs.articleSrc) {
    return;
  }

  const src = project.docs.articleSrc;
  const folder = path.join(process.cwd(), src);

  project.docs.article = readFolder(folder, 'docs');
}

function readFolder(folderPath, dest) {
  const entries = fs.readdirSync(folderPath)
    .map(x => parsePath(folderPath, x, dest))
    .sort((a, b) => a.order - b.order);

  for (let i = 0, ii = entries.length; i < ii; ++i) {
    const current = entries[i];

    switch(current.type) {
      case 'folder':
        const childEntries = readFolder(current.path, current.dest);
        const indexEntry = childEntries.find(x => x.type === 'index');

        if (!indexEntry) {
          throw new Error(`Doc folders must contain a README.md file. ${current.path}`);
        }

        const indexMeta = getMetadata(
          fs.readFileSync(indexEntry.path).toString(),
          indexEntry.path
        );

        entries[i] = {
          name: indexMeta.name,
          description: indexMeta.description,
          dest: current.dest,
          items: childEntries.filter(x => !x.ignore)
        };

        break;
      case 'article':
        const articleMeta = getMetadata(
          fs.readFileSync(current.path).toString(),
          current.path
        );

        entries[i] = {
          name: articleMeta.name,
          description: articleMeta.description,
          src: path.relative(process.cwd(), current.path),
          dest: current.dest,
          featured: !!articleMeta.featured
        };

        break;
    }
  }

  return entries;
}

const ignoredFolders = ['img', 'image', 'images']

function parsePath(folderPath, name, dest) {
  const fullPath = path.join(folderPath, name);

  if (name === 'README.md') {
    return {
      type: 'index',
      ignore: true,
      order: 0,
      path: fullPath,
      fileName: name,
      dest: path.join(dest, name)
    };
  } else if (ignoredFolders.indexOf(name) !== -1) {
    return {
      type: 'images',
      ignore: true,
      order: 0,
      path: fullPath,
      fileName: name
    };
  }

  const index = name.indexOf('.');

  if (index === -1)  {
    throw new Error(`Invalid documentation file or folder name. ${name}`);
  }

  const number = name.substr(0, index + 2).replace('.', '').trim();
  const slug = path.basename(name.substr(index + 1).trim(), '.md');
  const isFolder = fs.lstatSync(fullPath).isDirectory();

  return {
    type: isFolder ? 'folder' : 'article',
    order: parseInt(number, 10),
    slug: slug,
    path: fullPath,
    fileName: name,
    dest: path.join(dest, slug)
  };
}
