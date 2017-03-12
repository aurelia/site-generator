import {HttpClient} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-dependency-injection';
import {InlineViewStrategy} from 'aurelia-templating';
import {join} from 'aurelia-path';

@autoinject
export class Article {
  url: string = null;
  strategy: InlineViewStrategy;

  constructor(private http: HttpClient) {}

  withUrl(url: string) {
    this.url = url;
    return this;
  }

  activate() {
    return this.http.fetch(join(this.url, 'index-fragment.html'))
      .then(response => response.text())
      .then(text => {
        this.strategy = new InlineViewStrategy(`<template>${text}</template>`);
      });
  }

  getViewStrategy() {
    return this.strategy;
  }
}
