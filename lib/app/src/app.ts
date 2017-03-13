import {autoinject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from './router';
import {ActivateTab, ActivateScreen} from './messages/shell';

@autoinject
export class App {
  activeTab = null;
  activeScreen = null;

  constructor(private router: Router, private ea: EventAggregator) {
    this.ea.subscribe(ActivateTab, (msg:ActivateTab) => this.activeTab = msg.name);
    this.ea.subscribe(ActivateScreen, (msg:ActivateScreen) => this.activeScreen = msg.screen);
  }

  activate() {
    this.router.activate();
  }
}
