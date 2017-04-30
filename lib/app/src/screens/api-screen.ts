import {HttpClient} from 'aurelia-fetch-client';
import {autoinject, transient} from 'aurelia-dependency-injection';
import {InlineViewStrategy} from 'aurelia-templating';
import {join} from 'aurelia-path';
import {DocItem} from '../configuration';
import {SearchEngine} from '../backend/search-engine';

@autoinject
@transient()
export class APIScreen {
  item: DocItem = null;
  dest: string;
  strategy: InlineViewStrategy;
  searchResults;
  query: string;

  constructor(private http: HttpClient, private searchEngine: SearchEngine) { }

  withItem(item: DocItem, dest: string) {
    this.item = item;
    this.dest = dest;
    return this;
  }

  activate() {
    return this.http.fetch(join(this.dest, 'index-fragment.html'))
      .then(response => response.text())
      .then(text => {
        this.strategy = new InlineViewStrategy(`<template>${text}</template>`);
      });
  }

  getViewStrategy() {
    return this.strategy;
  }

  search(event) {
    this.query = event.detail;

    if (!this.query) {
      this.searchResults = null;
    } else {
      this.searchEngine.searchAPI(this.query).then(x => this.searchResults = x);
    }
  }
}
