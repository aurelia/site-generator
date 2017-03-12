import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {ShowMenu, HideMenu} from './messages/menu';

@autoinject
export class SideBar {
  isActive = false;
  docs = window['aureliaDocConfiguration'].documentation;
  selectedItem:any = null;
  menu: any = null;

  constructor(private ea: EventAggregator, private history: History) {
    ea.subscribe(ShowMenu, (msg:ShowMenu) => {
      let api = this.docs.api.find(x => x.dest === msg.path);

      if (api) {
        this.selectedItem = api;
        this.menu = this.docs.api;
      }
      
      this.isActive = true;
    });

    ea.subscribe(HideMenu, (msg:HideMenu) => {
      this.isActive = false;
    });
  }

  select(item) {
    if (item.items) {
      this.menu = item.items;
    } else {
      this.history.navigate(item.dest);
    }
  }
}
