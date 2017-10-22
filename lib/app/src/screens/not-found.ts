import {HttpClient} from 'aurelia-fetch-client';
import {autoinject} from 'aurelia-dependency-injection';
import {InlineViewStrategy} from 'aurelia-templating';
import {join} from 'aurelia-path';
import {DocItem} from '../configuration';

@autoinject
export class NotFoundScreen {
  item: DocItem = null;
  strategy: InlineViewStrategy;

  constructor(private http: HttpClient) {}

  activate() {
    return this.http.fetch('404-fragment.html')
      .then(response => response.text())
      .then(text => {
        this.strategy = new InlineViewStrategy(`<template>${text}</template>`);
      });
  }

  getViewStrategy() {
    return this.strategy;
  }
}
