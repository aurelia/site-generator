import {Container, autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowMenu, HideMenu, ActivateScreen, ActivateTab} from './messages/shell';
import {ArticleScreen} from './screens/article-screen';
import {APIScreen} from './screens/api-screen';
import {Configuration} from './configuration';

@autoinject
export class Router {
  constructor(private config: Configuration, private container: Container, private history: History, private ea: EventAggregator) {}

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
      this.ea.publish(new ActivateTab('discuss'));
      this.ea.publish(new HideMenu());
    } else if (url.indexOf('blog') !== -1) {
      this.ea.publish(new ActivateTab('blog'));
      this.ea.publish(new HideMenu());
    } else if (url.indexOf('api') !== -1) {
      let matchedAPI = this.config.findApiItem(url);
      if (matchedAPI) {
        this.ea.publish(new ActivateTab('api'));
        this.ea.publish(new ActivateScreen(this.container.get(APIScreen).withItem(matchedAPI)));
        this.ea.publish(new ShowMenu(matchedAPI));
      } else {
        this.navigateHome();
      }
    } else if (url.indexOf('article') !== -1) {
      let matchedToCItem = this.config.findToCItem(url);
      if (matchedToCItem) {
        this.ea.publish(new ActivateTab('article'));
        this.ea.publish(new ActivateScreen(this.container.get(ArticleScreen).withItem(matchedToCItem)));
        this.ea.publish(new ShowMenu(matchedToCItem));
      } else {
        this.navigateHome();
      }
    } else {
      this.navigateHome();
    }
  }

  navigateHome() {
    this.ea.publish(new ActivateTab('home'));
    this.ea.publish(new HideMenu());
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
