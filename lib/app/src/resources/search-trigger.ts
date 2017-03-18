import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {ShowSearch} from '../messages/shell';

@autoinject
export class SearchTrigger {
  constructor(private ea: EventAggregator) {}

  openSearch() {
    this.ea.publish(new ShowSearch());  
  }
}
