import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {observable} from 'aurelia-binding';
import {ActiveLanguageChanged} from './messages/shell';
import {parseQueryString} from 'aurelia-path';

export interface DocItem extends Location {
  name: string;
  dest: string;
  parent?: DocItem;
  items?: DocItem[];
  id: string;
}

const activeLanguageKey = 'activeLanguage';

@autoinject
export class Configuration {
  private config = window['siteConfig'];
  private apiRoot;
  private articleRoot;

  public name: string = this.config.name;
  public trackingID: string = this.config.trackingID;
  public support: DocItem = this.config.support;
  public learn: DocItem = this.config.learn;
  public blog: DocItem = this.config.blog;
  public home: DocItem = this.config.home;
  public pages: DocItem[] = this.config.pages;
  public search: boolean = this.config.search;

  public availableLanguages = ['ES Next', 'TypeScript'];
  @observable public activeLanguage: string = this.retrieveLanguagePreference();

  constructor(private ea: EventAggregator) {
    if (this.config.docs) {
      this.apiRoot = { items: this.config.docs.api, name: 'APIs', dest: 'docs/api', hideWhenParent: true };
      this.articleRoot = { items: this.config.docs.article, name: 'Guides', dest: 'docs' };

      associateParents(this.apiRoot, this.config.docs.api);
      associateParents(this.articleRoot, this.config.docs.article);
    }
  }

  public get API(): DocItem[] {
    return this.config.docs.api;
  }

  findApiItem(path: string): DocItem | null {
    if (path === 'docs/api') {
      return this.apiRoot;
    }

    const parts = path.split('/');
    const toSearch = `${parts[0]}/${parts[1]}/${parts[2]}`;

    return this.config.docs.api.find(x => x.dest === toSearch);
  }

  findToCItem(path: string): DocItem | null {
    if (path === 'docs') {
      return this.articleRoot;
    }

    return findIn(this.config.docs.article, path);
  }

  subscribeToActiveLanguageChanged(callback: Function) {
    return this.ea.subscribe(ActiveLanguageChanged, callback);
  }

  private activeLanguageChanged() {
    this.saveLanguagePreference();
    this.ea.publish(new ActiveLanguageChanged(this.activeLanguage));
  }

  private retrieveLanguagePreference(): string {
    //First we check the query string to see if someone linked to a particular language.
    if (location !== undefined) {
      let qs = <any>parseQueryString(location.search);

      if (qs.language && qs.language.toLowerCase() === 'typescript') {
        return this.availableLanguages[1];
      }
    }

    //If no QS, we check to see if the user has previously made a selection.
    if (localStorage !== undefined) {
      let value = localStorage.getItem(activeLanguageKey);

      if (this.availableLanguages.indexOf(value) !== -1) {
        return value;
      }
    }

    //If no QS and no previous selection, we default to the first available language.
    return this.availableLanguages[0];
  }

  private saveLanguagePreference() {
    if (localStorage !== undefined) {
      return localStorage.setItem(activeLanguageKey, this.activeLanguage);
    }
  }
}

function slugify(string) {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, '-') // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

function associateParents(parent, items: DocItem[]) {
  items.forEach(x => {
    x.parent = parent;
    x.id = slugify(x.name);

    if (x.items) {
      associateParents(x, x.items);
    }
  });
}

function findIn(items:DocItem[], path: string): any {
  let found = items.find(x => x.dest === path);

  if (found) {
    return found;
  }

  for (let i = 0, ii = items.length; i < ii; ++i) {
    let current = items[i];

    if (current.items) {
      found = findIn(current.items, path);
      if (found) {
        return found;
      }
    }
  }

  return null;
}
