import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {ToggleSearch, HideSearch} from '../messages/shell';

@autoinject
export class SearchPanel {
  isActive = false;

  constructor(private ea: EventAggregator) {
    ea.subscribe(ToggleSearch, (msg:ToggleSearch) => {
      this.isActive = !this.isActive;

      if (this.isActive) {
        //TODO: focus input
      }
    });

    ea.subscribe(HideSearch, (msg:HideSearch) => {
      this.isActive = false;
    });
  }
}
