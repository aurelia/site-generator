import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {ShowMenu, HideMenu} from './messages/menu';
import {Configuration} from './configuration';

@autoinject
export class SideBar {
  isActive = false;
  docs = window['aureliaDocConfiguration'].docs;
  selectedItem:any = null;
  menu: any = null;

  constructor(private config: Configuration, private ea: EventAggregator, private history: History) {
    ea.subscribe(ShowMenu, (msg:ShowMenu) => {
      let api = this.config.findApiItem(msg.path);

      if (api) {
        this.selectedItem = api;
        this.menu = this.docs.api;
        this.isActive = true;
      } else {
        let articleOrGroup = config.findToCItem(msg.path);

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
