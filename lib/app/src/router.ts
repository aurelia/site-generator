import {Container, autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {EventAggregator} from 'aurelia-event-aggregator';
import {ShowMenu, HideMenu, ActivateScreen, ActivateTab, ActivateSection} from './messages/shell';
import {ArticleScreen} from './screens/article-screen';
import {APIScreen} from './screens/api-screen';
import {HomeScreen} from './screens/home-screen';
import {BlogScreen} from './screens/blog-screen';
import {Configuration} from './configuration';

const offset = 64;

@autoinject
export class Router {
  private url: string;
  items: any[];
  fragment: string;
  main: HTMLElement;

  constructor(private config: Configuration, private container: Container, private history: History, private ea: EventAggregator) {}

  activate(main: HTMLElement) {
    this.main = main;

    this.history.activate({ 
      pushState: true,
      root: document.getElementsByTagName('base')[0].getAttribute('href'),
      routeHandler: this.loadUrl.bind(this) 
    });

    this.ea.subscribe(ActivateScreen, (msg:ActivateScreen) => {
      this.fragment = msg.fragment;
    });

    this.ea.subscribe(ActivateSection, (msg: ActivateSection) => {
      this.main.scrollTop = findPos(document.getElementById(msg.id)) - offset;

      if (msg.replaceFragment) {
        this.replaceFragment(msg.id);
      }

      this.spy();
    });

    this.main.addEventListener('scroll', () => {
      this.spy();
    });
  }

  loadUrl(url: string) {
    let fragment = window.location.hash.substring(1) || '';
    url = this.url = trimStart('/', trimEnd('/', url)).replace('#' + fragment, '');
    
    if (url.indexOf('help') !== -1) {
      let helpToc = this.config.help;
      this.ea.publish(new ActivateTab('help'));
      this.ea.publish(new ActivateScreen(this.container.get(ArticleScreen).withItem(helpToc), fragment));
      this.ea.publish(new ShowMenu(helpToc));
    } else if (url.indexOf('blog') !== -1) {
      //TODO: Implement Blog. Currently the sidebar links to Ghost.
      this.ea.publish(new ActivateTab('blog'));
      this.ea.publish(new ActivateScreen(this.container.get(BlogScreen).withItem(this.config.blog)));
      this.ea.publish(new HideMenu());
    } else if (url.indexOf('docs') !== -1) {
      if (url.indexOf('api') !== -1) {
        let matchedAPI = this.config.findApiItem(url);
        if (matchedAPI) {
          this.ea.publish(new ActivateTab('api'));
          this.ea.publish(new ActivateScreen(this.container.get(APIScreen).withItem(matchedAPI, url)));
          this.ea.publish(new ShowMenu(matchedAPI));
        } else {
          this.navigateToNotFound();
        }
      } else {
        let matchedToCItem = this.config.findToCItem(url);
        if (matchedToCItem) {
          this.ea.publish(new ActivateTab('article'));
          this.ea.publish(new ActivateScreen(this.container.get(ArticleScreen).withItem(matchedToCItem), fragment));
          this.ea.publish(new ShowMenu(matchedToCItem));
        } else {
          this.navigateToNotFound();
        }
      }
    } else {
      this.navigateToHome();
    }
  }

  navigateToNotFound() {
    this.navigateToHome();
  }

  navigateToHome() {
    this.ea.publish(new ActivateTab('home'));
    this.ea.publish(new ActivateScreen(this.container.get(HomeScreen).withItem(this.config.home)));
    this.ea.publish(new HideMenu());
  }

  onScreenActivated() {
    let nodeList = document.querySelectorAll('side-bar-view.active ul li a');
    var ary = Array.prototype.slice.call(nodeList);
    
    this.items = getItems(ary);

    if (this.fragment) {
      this.ea.publish(new ActivateSection(this.fragment, false));
    } else {
      this.main.scrollTop = 0;
      this.spy();
    }
  }

  private replaceFragment(fragment) {
    this.history.navigate(this.url + '#' + fragment, { replace: true, trigger: false })
  }

  private spy() {
    let find = -1;
  
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
  var items = [];

  for (let i = 0, l = ary.length; i < l; i++) {
    var id = ary[i].hash.replace(/^#/, '');
    var $element = document.getElementById(id);

    if (!$element) {
      return items;
    }

    var $target = $element.parentElement;
    var offset = getOffsetRect($target);
    var height = window.getComputedStyle($target)['height'];

    items[i] = { 
      id: id,
      height: parseInt(height), 
      top: offset.top, 
      elem: ary[i] 
    };
  }

  return items;
}

function findPos(obj) {
  var curtop = 0;

  if (obj.offsetParent) {
    do {
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);

    return curtop;
  }
}

function getOffsetRect(elem) {
  // (1)
  const box = elem.getBoundingClientRect();

  const body = document.body;
  const docElem = document.documentElement;

  // (2)
  const scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
  const scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

  // (3)
  const clientTop = docElem.clientTop || body.clientTop || 0;
  const clientLeft = docElem.clientLeft || body.clientLeft || 0;

  // (4)
  const top = box.top + scrollTop - clientTop;
  const left = box.left + scrollLeft - clientLeft;

  return { top: Math.round(top), left: Math.round(left) };
}
