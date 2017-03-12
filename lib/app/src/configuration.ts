export interface DocItem {
  name: string;
  dest: string;
}

export interface ToCItem extends DocItem {
  items?: ToCItem[];
  personas?: string[];
}

export class Configuration {
  private config = window['aureliaDocConfiguration'];

  findApiItem(path: string): DocItem | null {
    return this.config.docs.api.find(x => x.dest === path);
  }

  findToCItem(path: string): ToCItem | null {
    return findIn(this.config.docs.article, path);
  }
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
