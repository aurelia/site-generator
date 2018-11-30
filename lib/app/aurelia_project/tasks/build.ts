import * as gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import copyFiles from './copy-files';
import {build} from 'aurelia-cli';
import * as project from '../aurelia.json';
import * as del from 'del';

export default gulp.series(
  clean,
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS,
    copyFiles
  ),
  writeBundles
);

function clean() {
  return del([
    project.platform.output + '/aurelia-docs*.js',
    project.platform.output + '/aurelia-docs*.js.map'
  ]);
}

function readProjectConfiguration() {
  return build.src(project);
}

function writeBundles() {
  return build.dest();
}
