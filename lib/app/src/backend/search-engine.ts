import {autoinject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-fetch-client';
import * as lunr from 'lunr';
import {Cache} from './cache';

const searchStorageKey = 'aurelia-docs:search:index';

@autoinject
export class SearchEngine {
  indexes: any;
  indexData: any;

  constructor(private http: HttpClient, private cache: Cache) { }

  search(text) {
    let aggregate: any = {};
    return Promise.all([
      this.searchArticles(text).then(results => aggregate.articleResults = results),
      this.searchAPI(text).then(results => aggregate.apiResults = results)
    ]).then(() => aggregate);
  }

  searchArticles(text) {
    return this.ensureIndexes().then(indexes => {
      let results = indexes.articleIndex.search(text);
      return results.map(x => this.indexData.articles.lookup[x.ref]);
    });
  }

  searchAPI(text) {
    return this.ensureIndexes().then(indexes => {
      let results = indexes.apiIndex.search(text);
      return results.map(x => this.indexData.api.lookup[x.ref]);
    });
  }

  ensureIndexes() {
    if (this.indexes) {
      return Promise.resolve(this.indexes);
    }

    if (this.indexData) {
      let indexes = {
        articleIndex: lunr(function() {
          this.ref('id');
          this.field('articleName', { boost: 10 });
          this.field('sectionName', { boost: 7 });;
          this.field('text', { boost: 5 });
        }),
        apiIndex: lunr(function() {
          this.ref('id');
          this.field('name', { boost: 10 });
          this.field('ownerName', { boost: 7 });
        })
      };

      this.indexData.articles.lookup = {};
      this.indexData.articles.data.forEach(x => {
        this.indexData.articles.lookup[x.id] = x;
        indexes.articleIndex.add(x);
        x.href = `${x.articleHref}#section/${x.sectionId}`;
      });

      this.indexData.api.lookup = {};
      this.indexData.api.data.forEach(x => {
        this.indexData.api.lookup[x.id] = x;
        indexes.apiIndex.add(x);

        if (x.ownerKind) {
          x.href = x.apiHref + '#/' + x.ownerKind.toLowerCase() + '/' + x.ownerName;
        } else {
          x.href = x.apiHref + '#/' + x.kind.toLowerCase() + '/' + x.name;
        }
      });

      return Promise.resolve(this.indexes = indexes);
    }

    return this.getIndexes().then(() => this.ensureIndexes());
  }

  getIndexes() {
    let existing = this.cache.getItem(searchStorageKey);

    if (existing) {
      this.indexData = JSON.parse(existing);
      this.loadIndexes(); //go check for an updated version
      return Promise.resolve();
    }

    return this.loadIndexes();
  }

  loadIndexes() {
    return this.http.fetch('../scripts/search-index.json')
      .then(response => response.text())
      .then(text => {
        this.cache.setItem(searchStorageKey, text, this.cache.farFuture());
        return this.indexData = JSON.parse(text);
    });
  }
}

