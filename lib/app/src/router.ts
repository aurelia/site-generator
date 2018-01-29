import {DOM} from 'aurelia-pal';
import {Container, autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowMenu, HideMenu, ActivateScreen, ActivateTab, ActivateSection} from './messages/shell';
import {ArticleScreen} from './screens/article-screen';
import {APIScreen} from './screens/api-screen';
import {HomeScreen} from './screens/home-screen';
import {NotFoundScreen} from './screens/not-found';
import {Configuration} from './configuration';
import environment from './environment';

declare var gtag: any;
const offset = 64;

@autoinject
export class Router {
  private url: string;
  items: any[];
  fragment: string;
  main: HTMLElement;
  scrollGuard = false;
  scrollHooked = false;

  constructor(private config: Configuration, private container: Container, private history: History, private ea: EventAggregator) {}

  activate(main: HTMLElement) {
    this.main = main;

    this.history.activate({ 
      pushState: true,
      root: document.getElementsByTagName('base')[0].getAttribute('href'),
      routeHandler: this.loadUrl.bind(this) 
    });

    this.ea.subscribe(ActivateSection, (msg: ActivateSection) => {
      this.scrollGuard = true;

      this.main.scrollTop = findPosition(document.getElementById(msg.id)) - offset;

      if (msg.replaceFragment) {
        this.replaceFragment(msg.id);
      }

      this.spy();

      setTimeout(() => this.scrollGuard = false, 16);
    });
  }

  ensureScrollHooked() {
    if (this.scrollHooked) {
      return;
    }

    this.scrollHooked = true;

    this.main.addEventListener('scroll', () => {
      if (this.scrollGuard) {
        return;
      }

      this.spy();
    });
  }

  loadUrl(url: string) {
    let fragment = this.fragment = window.location.hash.substring(1) || '';
    url = this.url = trimStart('/', trimEnd('/', url)).replace('#' + fragment, '');

    if (url === this.config.help.dest) {
      let helpToc = this.config.help;
      this.ea.publish(new ActivateTab(helpToc.dest));
      this.ea.publish(new ActivateScreen(this.container.get(ArticleScreen).withItem(helpToc), fragment));
      this.ea.publish(new ShowMenu(helpToc));
      this.history.setTitle(`${helpToc.name} | ${this.config.name}`);
      this.trackPageView(url);
    } else if (url.indexOf(this.config.blog.dest) === 0) {
      this.ea.publish(new ActivateTab(this.config.blog.dest));
      this.ea.publish(new ActivateScreen(this.container.get(ArticleScreen).withItem({ dest: url })), fragment);
      this.ea.publish(new HideMenu());
      this.history.setTitle(`Blog | ${this.config.name}`);
      this.trackPageView(url);
    } else if (url === '' || url === 'home') {
      this.navigateToHome(url);
    } else if (url.indexOf('docs') === 0) {
      if (url.indexOf('api') !== -1) {
        let matchedAPI = this.config.findApiItem(url);
        if (matchedAPI) {
          this.ea.publish(new ActivateTab('api'));
          this.ea.publish(new ActivateScreen(this.container.get(APIScreen).withItem(matchedAPI, url)));
          this.ea.publish(new ShowMenu(matchedAPI));
          this.history.setTitle(`${matchedAPI.name} | ${this.config.name}`);
          this.trackPageView(url);
        } else {
          this.navigateToNotFound(url);
        }
      } else {
        let matchedToCItem = this.config.findToCItem(url);
        if (matchedToCItem) {
          this.ea.publish(new ActivateTab('article'));
          this.ea.publish(new ActivateScreen(this.container.get(ArticleScreen).withItem(matchedToCItem), fragment));
          this.ea.publish(new ShowMenu(matchedToCItem));
          this.history.setTitle(`${matchedToCItem.name} | ${this.config.name}`);
          this.trackPageView(url);
        } else {
          this.navigateToNotFound(url);
        }
      }
    } else {
      this.navigateToNotFound(url);
    }
  }

  trackPageView(url) {
    let data = {
      'page_title': DOM.title,
      'page_location': window.location.href,
      'page_path': url
    };

    if (environment.debug) {
      console.log(this.config.trackingID, data);
    } else {
      gtag('config', this.config.trackingID, data);
    }
  }

  navigateToNotFound(url: string) {
    this.ea.publish(new ActivateTab(''));
    this.ea.publish(new ActivateScreen(this.container.get(NotFoundScreen)));
    this.ea.publish(new HideMenu());
    this.history.setTitle(`404 - Not Found | ${this.config.name}`);
    this.trackPageView(url);
  }

  navigateToHome(url: string) {
    this.ea.publish(new ActivateTab('home'));
    this.ea.publish(new ActivateScreen(this.container.get(HomeScreen).withItem(this.config.home)));
    this.ea.publish(new HideMenu());
    this.history.setTitle(`Home | ${this.config.name}`);
    this.trackPageView(url);
  }

  onScreenActivated() {
    this.populateItems();

    if (this.fragment) {
      this.ea.publish(new ActivateSection(this.fragment, false));
    } else {
      this.spy();
    }
  }

  private populateItems() {
    this.main.scrollTop = 0;

    let nodeList = document.querySelectorAll('side-bar-view.active ul li a');
    let ary = Array.prototype.slice.call(nodeList);
    this.items = getItems(ary);
  }

  private replaceFragment(fragment) {
    this.history.navigate(this.url + '#' + fragment, { replace: true, trigger: false })
  }

  private spy() {
    let find = -1;

    if (!this.items || !this.items.length) {
      return;
    }
  
    for (var i = 0, l = this.items.length; i < l; i++) {
      if (this.main.scrollTop > this.items[i].top - offset) {
        find = i;
      }
    }
  
    for (let j = 0, l = this.items.length; j < l; j++) {
      this.items[j].elem.parentElement.classList.remove('active');
    }
  
    if (find !== -1) {
      this.items[find].elem.parentElement.classList.add('active');
      this.replaceFragment(this.items[find].id);
    }

    this.ensureScrollHooked();
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

function getItems(ary) {
  let items = [];

  for (let i = 0, l = ary.length; i < l; i++) {
    let id = ary[i].hash.replace(/^#/, '');
    let $element = document.getElementById(id);

    if (!$element) {
      return items;
    }

    let $target = $element.parentElement;
    let offsetTop = getOffsetTop($target);

    items[i] = { 
      id: id,
      top: offsetTop, 
      elem: ary[i] 
    };
  }

  return items;
}

function findPosition(obj) {
  let currentTop = 0;

  if (obj.offsetParent) {
    do {
      currentTop += obj.offsetTop;
    } while (obj = obj.offsetParent);

    return currentTop;
  }
}

function getOffsetTop(elem) {
  const box = elem.getBoundingClientRect();
  const body = document.body;
  const docElem = document.documentElement;
  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;;
  const clientTop = docElem.clientTop || body.clientTop || 0;
  const top = box.top + scrollTop - clientTop;
  return Math.round(top);
}
