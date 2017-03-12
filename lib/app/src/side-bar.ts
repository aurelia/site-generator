import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {ShowMenu, HideMenu} from './messages/menu';

@autoinject
export class SideBar {
  isActive = false;
  docs = window['aureliaDocConfiguration'].docs;
  selectedItem:any = null;
  menu: any = null;

  constructor(private ea: EventAggregator, private history: History) {
    ea.subscribe(ShowMenu, (msg:ShowMenu) => {
      let api = this.docs.api.find(x => x.dest === msg.path);

      if (api) {
        this.selectedItem = api;
        this.menu = this.docs.api;
        this.isActive = true;
      } else {
        let articleOrGroup = findIn(this.docs.article, msg.path);

        if (articleOrGroup) {
          if (articleOrGroup.items) {
            this.menu = articleOrGroup.items;
          } else {
            this.selectedItem = articleOrGroup;
            //TODO: load up the headings
          }

          this.isActive = true;
        } else {
          this.isActive = false;
        }
      }
    });

    ea.subscribe(HideMenu, (msg:HideMenu) => {
      this.isActive = false;
    });
  }

  select(item) {
    this.history.navigate(item.dest);
  }
}

function findIn(items:any[], path: string): any {
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
}
