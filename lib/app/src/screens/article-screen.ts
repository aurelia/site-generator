import {HttpClient} from 'aurelia-fetch-client';
import {autoinject, transient} from 'aurelia-dependency-injection';
import {InlineViewStrategy} from 'aurelia-templating';
import {join} from 'aurelia-path';
import {DocItem} from '../configuration';

@autoinject
@transient()
export class ArticleScreen {
  item: DocItem = null;
  strategy: InlineViewStrategy;

  constructor(private http: HttpClient) {}

  withItem(item: DocItem, fragment: string) {
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
