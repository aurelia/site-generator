import {autoinject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from './router';
import {ActivateTab, ActivateScreen} from './messages/shell';

@autoinject
export class App {
  activeTab = null;
  activeScreen = null;
  main: HTMLElement;

  constructor(private router: Router, private ea: EventAggregator) {
    this.ea.subscribe(ActivateTab, (msg:ActivateTab) => this.activeTab = msg.name);
    this.ea.subscribe(ActivateScreen, (msg:ActivateScreen) => {
      this.activeScreen = msg.screen;
      scrollTo(this.main, 0, 400);
    });
  }

  activate() {
    this.router.activate();
  }
}

//when navigation link clicked
//  update fragment; replace: true, trigger: true
//when user scroll changes
//  update fragment; replace: true, trigger: true
//when fragment changed
//  scroll to fragment associated header (only if not user scrolling)
//  highlight associated navigation link
//when page loads
//  is there a fragment?
//    yes: manually trigger fragment changed handler
//    no: scroll to top

function scrollTo(element, to, duration) {
  let start = element.scrollTop,
      change = to - start,
      increment = 20;

  let animateScroll = elapsedTime => {        
    elapsedTime += increment;
    var position = easeInOut(elapsedTime, start, change, duration);                        
    element.scrollTop = position; 
    if (elapsedTime < duration) {
      setTimeout(() => animateScroll(elapsedTime), increment);
    }
  };

  animateScroll(0);
}

function easeInOut(currentTime, start, change, duration) {
  currentTime /= duration / 2;

  if (currentTime < 1) {
      return change / 2 * currentTime * currentTime + start;
  }

  currentTime -= 1;
  return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}
