import {autoinject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from './router';
import {ActivateTab, ActivateScreen, ActivateSection} from './messages/shell';

@autoinject
export class App {
  activeTab = null;
  activeScreen = null;
  main: HTMLElement;
  items: any[];
  fragment: string;

  constructor(public router: Router, private ea: EventAggregator) {
    this.ea.subscribe(ActivateTab, (msg:ActivateTab) => this.activeTab = msg.name);

    this.ea.subscribe(ActivateScreen, (msg:ActivateScreen) => {
      this.activeScreen = msg.screen;
      this.fragment = msg.fragment;
    });

    this.ea.subscribe(ActivateSection, (msg: ActivateSection) => {
      this.main.scrollTop = findPos(document.getElementById(msg.id)) - 64;

      if (msg.replaceFragment) {
        this.router.replaceFragment(msg.id);
      }

      this.spy();
    });
  }

  activate() {
    this.router.activate();

    this.main.addEventListener('scroll', () => {
      this.spy();
    });
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

  spy() {
    let find = -1;
  
    for (var i = 0, l = this.items.length; i < l; i++) {
      if (this.main.scrollTop > this.items[i].top - 64) {
        find = i;
      }
    }
  
    for (let j = 0, l = this.items.length; j < l; j++) {
      this.items[j].elem.parentElement.classList.remove('active');
    }
  
    if (find !== -1) {
      this.items[find].elem.parentElement.classList.add('active');
      this.router.replaceFragment(this.items[find].id);
    }
  }
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
