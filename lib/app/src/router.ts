import {Container, autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowMenu, HideMenu, ActivateScreen, ActivateTab} from './messages/shell';
import {ArticleScreen} from './screens/article-screen';
import {APIScreen} from './screens/api-screen';
import {HomeScreen} from './screens/home-screen';
import {DiscussScreen} from './screens/discuss-screen';
import {BlogScreen} from './screens/blog-screen';
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
    let fragment = window.location.hash.substring(1) || '';
    url = trimStart('/', trimEnd('/', url)).replace('#' + fragment, '');

    console.log(url, fragment);
    
    if (url.indexOf('discuss') !== -1) {
      this.ea.publish(new ActivateTab('discuss'));
      this.ea.publish(new ActivateScreen(this.container.get(DiscussScreen).withItem(this.config.discuss)));
      this.ea.publish(new HideMenu());
    } else if (url.indexOf('blog') !== -1) {
      this.ea.publish(new ActivateTab('blog'));
      this.ea.publish(new ActivateScreen(this.container.get(BlogScreen).withItem(this.config.blog)));
      this.ea.publish(new HideMenu());
    } else if (url.indexOf('api') !== -1) {
      let matchedAPI = this.config.findApiItem(url);
      if (matchedAPI) {
        this.ea.publish(new ActivateTab('api'));
        this.ea.publish(new ActivateScreen(this.container.get(APIScreen).withItem(matchedAPI, url)));
        this.ea.publish(new ShowMenu(matchedAPI));
      } else {
        this.navigateHome();
      }
    } else if (url.indexOf('article') !== -1) {
      let matchedToCItem = this.config.findToCItem(url);
      if (matchedToCItem) {
        this.ea.publish(new ActivateTab('article'));
        this.ea.publish(new ActivateScreen(this.container.get(ArticleScreen).withItem(matchedToCItem, fragment)));
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
    this.ea.publish(new ActivateScreen(this.container.get(HomeScreen).withItem(this.config.home)));
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

function getHashParams() {
  var hashParams = {};
  var e,
      a = /\+/g,  // Regex for replacing addition symbol with a space
      r = /([^&;=]+)=?([^&;]*)/g,
      d = function (s) { return decodeURIComponent(s.replace(a, " ")); },
      q = window.location.hash.substring(1);

  while (e = r.exec(q))
      hashParams[d(e[1])] = d(e[2]);

  return hashParams;
}
