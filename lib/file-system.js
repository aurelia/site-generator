const fs = require('fs');
const nodePath = require('path');
const mkdirp = require('./mkdirp').mkdirp;

exports.fs = fs;

exports.exists = function(path) {
  return new Promise((resolve, reject) => fs.exists(path, resolve));
};

exports.existsSync = function(path) {
  return fs.existsSync(path);
};

exports.mkdir = function(path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, (error, result) => {
      if(error) reject(error);
      else resolve();
    });
  });
};

exports.mkdirp = function(path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, error => {
      if(error) reject(error);
      else resolve();
    });
  });
}

exports.readdir = function(path) {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (error, files) => {
      if(error) reject(error);
      else resolve(files);
    });
  });
}

exports.readdirSync = function(path) {
  return fs.readdirSync(path);
}

exports.readFile = function(path, encoding) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, ensureEncoding(encoding), (error, data) => {
      if(error) reject(error);
      else resolve(data);
    });
  });
};

exports.readFileSync = fs.readFileSync;

exports.readFileSync = function(path, encoding) {
  return fs.readFileSync(path, ensureEncoding(encoding));
};

exports.deleteFile = function(path) {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (error) => {
      if (error) reject(error);
      else resolve();
    });
  });
};

exports.copy = function(sourceFile, targetFile, encoding) {
  return exports.readFile(sourceFile, encoding).then(source => exports.writeFile(targetFile, source, encoding));
};

exports.resolve = function(path) {
  return nodePath.resolve(path);
};

exports.join = function(...segments) {
  return nodePath.join.apply(this, segments);
};

exports.statSync = function (path) {
  return fs.statSync(path);
}

exports.writeFile = function(path, content, encoding) {
  return new Promise((resolve, reject) => {
    mkdirp(nodePath.dirname(path), err => {
      if (err) reject(err);
      else {
        fs.writeFile(path, content, ensureEncoding(encoding), error => {
          if (error) reject(error);
          else resolve();
        });
      }
    });
  });
}

function ensureEncoding(encoding) {
  if (encoding === undefined) {
    return 'utf8';
  }

  if (encoding === null) {
    return undefined;
  }

  return encoding || 'utf8';
}

function copyFileSync(source, target) {
  var targetFile = target;

  //if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = nodePath.join(target, nodePath.basename(source));
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

exports.copyFolderRecursiveSync = function(source, target, skipJoin) {
  var files = [];

  //check if folder needs to be created or integrated
  var targetFolder = skipJoin ? target : nodePath.join(target, nodePath.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  //copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach(file => {
      var curSource = nodePath.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        this.copyFolderRecursiveSync(curSource, targetFolder);
      } else {
        copyFileSync( curSource, targetFolder );
      }
    });
  }
}
