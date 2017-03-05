const fs = require('./file-system');
const path = require('path');
const ArticleProcessor = require('./article-processor').ArticleProcessor;

let GroupProcessor = exports.GroupProcessor = class {
  constructor(group) {
    this.group = group;
    this.processors = GroupProcessor.createProcessorsFrom(group.items);
  }

  process() {
    let writerPromises = [];

    for (let processor of this.processors) {
      writerPromises.push(processor.process());
    }

    return Promise.all(writerPromises)
      .then(writers => new GroupWriter(writers));
  }

  static createProcessorsFrom(items) {
    let processors = [];

    for (let item of items) {
      if (item.items) {
        processors.push(new GroupProcessor(item));
      } else {
        processors.push(new ArticleProcessor(item));
      }
    }

    return processors;
  }
}

class GroupWriter {
  constructor(writers) {
    this.writers = writers;
  }

  write(outDir) {
    let writePromises = [];

    for (let writer of this.writers) {
      writePromises.push(writer.write(outDir));
    }

    return Promise.all(writePromises);
  }
}
