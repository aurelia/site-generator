import {HttpClient} from 'aurelia-fetch-client';
import {autoinject, transient} from 'aurelia-dependency-injection';
import {InlineViewStrategy} from 'aurelia-templating';
import {join} from 'aurelia-path';
import {Location} from '../configuration';
import 'http://blog.aurelia.io/shared/ghost-url.min.js?v=7013f8d3ca';

declare var ghost: any;
ghost.init({
  clientId: "ghost-frontend",
  clientSecret: "92ecab236b7e"
});

@autoinject
@transient()
export class HomeScreen {
  item: Location = null;
  strategy: InlineViewStrategy;
  blog;

  constructor(private http: HttpClient) {
    this.http.fetch(ghost.url.api('posts', {limit: 5}))
      .then(response => response.json())
      .then((blog: any) => {
        blog.posts.forEach(item => {
           let d = new Date(item.published_at);
           item.published_at = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
        });
        this.blog = blog;
        console.log(blog)
      });
  }

  withItem(item: Location) {
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
