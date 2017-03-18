import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {ToggleSearch} from '../messages/shell';

@autoinject
export class SearchTrigger {
  constructor(private ea: EventAggregator) {}

  openSearch() {
    this.ea.publish(new ToggleSearch());  
  }
}
