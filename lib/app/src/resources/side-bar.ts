import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {ShowMenu, HideMenu} from '../messages/shell';
import {Configuration, DocItem} from '../configuration';

@autoinject
export class SideBar {
  isActive = false;
  items: DocItem[] = null;
  activeItem: DocItem = null;

  constructor(private config: Configuration, private ea: EventAggregator, private history: History) {
    ea.subscribe(ShowMenu, (msg:ShowMenu) => {
      this.activeItem = msg.item;

      if (!msg.item.items && msg.item.parent) {
        this.items = msg.item.parent.items;
      }

      this.isActive = true;
    });

    ea.subscribe(HideMenu, (msg:HideMenu) => {
      this.isActive = false;
    });
  }

  select(item: DocItem) {
    this.history.navigate(item.dest);
  }
}
