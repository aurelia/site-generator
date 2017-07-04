export interface Location {
  name: string;
  dest: string;
}

export interface DocItem extends Location {
  parent?: ToCItem;
  items?: ToCItem[];
}

export interface ToCItem extends DocItem {
  personas?: string[];
}

export class Configuration {
  private config = window['aureliaDocConfiguration'];
  private apiRoot;
  private articleRoot;

  public activeLanguage: string = 'ES Next';

  public help: Location;
  public blog: Location;
  public home: Location;

  constructor() {
    this.home = this.config.home;
    this.blog = this.config.blog;
    this.help = this.config.help;
    this.apiRoot = { items: this.config.docs.api, name: 'APIs', dest: 'docs/api', hideWhenParent: true };
    this.articleRoot = { items: this.config.docs.article, name: 'Guides', dest: 'docs' };
 
    associateParents(this.apiRoot, this.config.docs.api);
    associateParents(this.articleRoot, this.config.docs.article);
  }

  public get API():DocItem[] {
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

  findToCItem(path: string): ToCItem | null {
    if (path === 'docs') {
      return this.articleRoot;
    }

    return findIn(this.config.docs.article, path);
  }
}

function associateParents(parent, items: DocItem[]) {
  items.forEach(x => {
    x.parent = parent;

    if (x.items) {
      associateParents(x, x.items);
    }
  });
}

function findIn(items:ToCItem[], path: string): any {
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
