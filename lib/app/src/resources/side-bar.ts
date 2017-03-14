import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {ShowMenu, HideMenu} from '../messages/shell';
import {Configuration, DocItem} from '../configuration';

@autoinject
export class SideBar {
  isActive = false;
  activeItem: DocItem = null;
  items: DocItem[] = null;

  constructor(private config: Configuration, private ea: EventAggregator, private history: History) {
    ea.subscribe(ShowMenu, (msg:ShowMenu) => {
      this.activeItem = msg.item;
      this.items = this.activeItem.items || this.activeItem.parent.items;
      this.isActive = true;
    });

    ea.subscribe(HideMenu, (msg:HideMenu) => {
      this.isActive = false;
    });
  }

  select(item: DocItem) {
    if (item === this.activeItem) {
      return;
    } else if (item.dest) {
      this.history.navigate(item.dest);
    }
  }
}
