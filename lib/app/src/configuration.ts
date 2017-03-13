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

  constructor() {
    associateParents({ items: this.config.docs.api }, this.config.docs.api);  
    associateParents({ items: this.config.docs.article }, this.config.docs.article);
  }

  public get API():DocItem[] {
    return this.config.docs.api;
  }

  findApiItem(path: string): DocItem | null {
    return this.config.docs.api.find(x => x.dest === path);
  }

  findToCItem(path: string): ToCItem | null {
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
