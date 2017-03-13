export interface DocItem {
  name: string;
  dest: string;
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

  constructor() {
    this.apiRoot = { items: this.config.docs.api, name: 'APIs', dest: 'docs/api' };
    this.articleRoot = { items: this.config.docs.article, name: 'Articles', dest: 'docs/article' };

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

    return this.config.docs.api.find(x => x.dest === path);
  }

  findToCItem(path: string): ToCItem | null {
    if (path === 'docs/article') {
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
