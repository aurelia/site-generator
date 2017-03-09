const APIProcessor = require('./api-processor').APIProcessor;

let APIGroupProcessor = exports.APIGroupProcessor = class {
  constructor(group) {
    this.group = group;
    this.processors = APIGroupProcessor.createProcessorsFrom(group.items);
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
        processors.push(new APIGroupProcessor(item));
      } else {
        processors.push(new APIProcessor(item));
      }
    }

    return processors;
  }
}

class GroupWriter {
  constructor(writers) {
    this.writers = writers;
  }

  write(render, outDir) {
    let writePromises = [];

    for (let writer of this.writers) {
      writePromises.push(writer.write(render, outDir));
    }

    return Promise.all(writePromises);
  }
}
