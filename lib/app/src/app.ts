import {autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowMenu, HideMenu} from './messages/menu';

@autoinject
export class App {
  activeTab = null;

  constructor(private history: History, private ea: EventAggregator) {}

  activate() {
    this.history.activate({ 
      pushState: true,
      root: document.getElementsByTagName('base')[0].getAttribute('href'),
      routeHandler: this.loadUrl.bind(this) 
    });
  }

  loadUrl(url: string) { 
    url = trimStart('/', trimEnd('/', url));
    console.log(url);
    
    if (url.indexOf('discuss') !== -1) {
      this.activeTab = 'discuss';
      this.ea.publish(new HideMenu());
    } else if (url.indexOf('blog') !== -1) {
      this.activeTab = 'blog';
      this.ea.publish(new HideMenu());
    } else if (url.indexOf('api') !== -1) {
      this.activeTab = 'apis';
      this.ea.publish(new ShowMenu(url));
    } else if (url.indexOf('article') !== -1) {
      this.activeTab = 'articles';
      this.ea.publish(new ShowMenu(url));
    } else {
      this.activeTab = 'home';
      this.ea.publish(new HideMenu());
    }
  }
}

function trimStart(character: string, string: string) {
  var startIndex = 0;

  while (string[startIndex] === character) {
      startIndex++;
  }

  return string.substr(startIndex);
}

function trimEnd(character: string, string: string) {
  var startIndex = string.length - 1;

  while (string[startIndex] === character) {
      startIndex--;
  }

  return string.substr(0, startIndex + 1);
}
