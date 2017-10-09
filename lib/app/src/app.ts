import {autoinject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ActivateTab, ActivateScreen} from './messages/shell';
import {Router} from './router';

@autoinject
export class App {
  activeTab = null;
  activeScreen = null;
  main: HTMLElement;

  constructor(private ea: EventAggregator, private router: Router) {
    this.ea.subscribe(ActivateTab, (msg:ActivateTab) => this.activeTab = msg.name);

    this.ea.subscribe(ActivateScreen, (msg:ActivateScreen) => {
      this.activeScreen = msg.screen;
    });
  }

  activate() {
    this.router.activate(this.main);
  }

  onScreenActivated() {
    this.router.onScreenActivated();
  }
}
