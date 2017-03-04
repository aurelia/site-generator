"use strict";

exports.CLI = class { 
  constructor() {
    this.options = {};
  }
  
  run() {
    return new Promise(resolve => {
      console.log('running aurelia-docs cli...');
    });
  }
}
