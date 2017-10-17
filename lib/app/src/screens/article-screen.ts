import {HttpClient} from 'aurelia-fetch-client';
import {autoinject, transient} from 'aurelia-dependency-injection';
import {InlineViewStrategy} from 'aurelia-templating';
import {join} from 'aurelia-path';
import {computedFrom} from 'aurelia-binding';
import {DocItem, Configuration} from '../configuration';

@autoinject
class ArticleContext {
  availableLanguages: Object = {};
  
  constructor(private config: Configuration) {
    this.availableLanguages[config.availableLanguages[0]] = {
      name: config.availableLanguages[0],
      fileExtension: '.js'
    };    

    this.availableLanguages[config.availableLanguages[1]] = {
      name: config.availableLanguages[1],
      fileExtension: '.ts'
    }; 
  }


  @computedFrom('config.activeLanguage')
  get language() {
    return this.availableLanguages[this.config.activeLanguage];
  }
}

@autoinject
@transient()
export class ArticleScreen {
  item: DocItem = null;
  strategy: InlineViewStrategy;

  constructor(private http: HttpClient, private context: ArticleContext) {}

  withItem(item: DocItem) {
    this.item = item;
    return this;
  }

  activate() {
    return this.http.fetch(join(this.item.dest, 'index-fragment.html'))
      .then(response => response.text())
      .then(text => {
        this.strategy = new InlineViewStrategy(`<template>${text}</template>`);
      });
  }

  getViewStrategy() {
    return this.strategy;
  }
}
