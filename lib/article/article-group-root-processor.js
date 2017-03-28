const path = require('path');
const handlebars = require('handlebars');
const fs = require('../file-system');
const ArticleGroupProcessor = require('./article-group-processor').ArticleGroupProcessor;
const tempatePath = require.resolve('../templates/article-group-root.html');
const source = fs.readFileSync(tempatePath);
const template = handlebars.compile(source);

const ArticleGroupRootProcessor = exports.ArticleGroupRootProcessor = class {
  constructor(items, dest) {
    this.items = items;
    this.dest = dest;
    this.processors = ArticleGroupProcessor.createProcessorsFrom(items);
  }

  process(context) {
    const writerPromises = [];

    for (let processor of this.processors) {
      writerPromises.push(processor.process(context));
    }

    return Promise.all(writerPromises)
      .then(writers => new GroupRootWriter(this.items, writers, this.dest));
  }
}

class GroupRootWriter {
  constructor(items, writers, dest) {
    this.items = items;
    this.writers = writers;
    this.dest = dest;
  }

  write(render, outDir) {
    const writePromises = [];
    const json = {
      name: 'Articles',
      featured: [],
      groups: [],
      links: {
        static: this.dest,
        html: path.join(this.dest, 'index.html'),
        fragment: path.join(this.dest, 'index-fragment.html'),
        self: path.join(this.dest, 'index.json')
      }
    };

    for (let writer of this.writers) {
      writePromises.push(writer.write(render, outDir));
      organizeItem(json, writer);
    }

    const htmlDest = path.join(outDir, json.links.html);
    const htmlFragmentDest = path.join(outDir, json.links.fragment);
    const jsonDest = path.join(outDir, json.links.self);
    const groupHTML = template(json);

    writePromises.push(fs.writeFile(htmlDest, render(json.name, groupHTML)));
    writePromises.push(fs.writeFile(htmlFragmentDest, groupHTML));
    writePromises.push(fs.writeFile(jsonDest, JSON.stringify(json)));

    return Promise.all(writePromises);
  }
}

function organizeItem(json, writer, parent) {
  let model = writer.model;

  if (model.featured) {
    json.featured.push(createChildJSON(writer));
  } else if (writer.writers) {
    let available = writer.writers.filter(x => !x.model.featured);

    if (available.length) {
      let group = parent || json.groups.find(x => x.name === writer.json.name);

      if (!group) {
        group = { name: writer.json.name, items: [] };
        json.groups.push(group);
      }

      available.forEach(x => organizeItem(json, x, group));
    } else {
      writer.writers.forEach(x => organizeItem(json, x, parent));
    }
  } else {
    let group = parent || json.groups.find(x => x.name === 'Basics');

    if (!group) {
      group = { name: 'Basics', items: [] };
      json.groups.push(group);
    }

    group.items.push(createChildJSON(writer))
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
