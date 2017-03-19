const path = require('path');
const handlebars = require('handlebars');
const fs = require('../file-system');
const ArticleProcessor = require('./article-processor').ArticleProcessor;
const tempatePath = require.resolve('../templates/article-group.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

const ArticleGroupProcessor = exports.ArticleGroupProcessor = class {
  constructor(group) {
    this.group = group;
    this.processors = ArticleGroupProcessor.createProcessorsFrom(group.items);
  }

  process(context) {
    const writerPromises = [];

    for (let processor of this.processors) {
      writerPromises.push(processor.process(context));
    }

    return Promise.all(writerPromises)
      .then(writers => new GroupWriter(this.group, writers));
  }

  static createProcessorsFrom(items) {
    const processors = [];

    for (let item of items) {
      if (item.items) {
        processors.push(new ArticleGroupProcessor(item));
      } else {
        processors.push(new ArticleProcessor(item));
      }
    }

    return processors;
  }
}

class GroupWriter {
  constructor(group, writers) {
    this.group = group;
    this.writers = writers;
    this.json = createGroupJSON(group);
  }

  write(render, outDir) {
    const writePromises = [];
    const groupModel = {
      name: this.group.name,
      description: this.group.description,
      items: []
    };

    for (let writer of this.writers) {
      writePromises.push(writer.write(render, outDir));
      groupModel.items.push(createChildJSON(writer));
    }

    if (this.group.dest) {
      const htmlDest = path.join(outDir, this.json.links.html);
      const htmlFragmentDest = path.join(outDir, this.json.links.fragment);
      const jsonDest = path.join(outDir, this.json.links.self);
      const groupHTML = template(groupModel);

      writePromises.push(fs.writeFile(htmlDest, render(this.name, groupHTML)));
      writePromises.push(fs.writeFile(htmlFragmentDest, groupHTML));
      writePromises.push(fs.writeFile(jsonDest, JSON.stringify(groupModel)));
    }

    return Promise.all(writePromises);
  }
}

function createGroupJSON(group) {
  return {
    name: group.name,
    description: group.description,
    links: {
      static: group.dest,
      html: path.join(group.dest, 'index.html'),
      fragment: path.join(group.dest, 'index-fragment.html'),
      self: path.join(group.dest, 'index.json')
    }
  }
}

function createChildJSON(writer) {
  return {
    name: writer.json.name,
    description: writer.json.description,
    author: writer.json.author,
    keywords: writer.json.keywords,
    links: writer.json.links
  }
}
