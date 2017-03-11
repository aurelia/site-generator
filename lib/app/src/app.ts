import {autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';

@autoinject
export class App {
  activeTab = null;

  constructor(private history: History) {}

  activate() {
    this.history.activate({ 
      pushState: true,
      root: document.getElementsByTagName('base')[0].href,
      routeHandler: this.loadUrl.bind(this) 
    });
  }

  loadUrl(url: string) { 
    if (url.indexOf('/discuss') !== -1) {
      this.activeTab = 'discuss';
    } else if (url.indexOf('/blog') !== -1) {
      this.activeTab = 'blog';
    } else if (url.indexOf('/api') !== -1) {
      this.activeTab = 'apis';
    } else if (url.indexOf('/docs') !== -1) {
      this.activeTab = 'articles';
    } else {
      this.activeTab = 'home';
    }
  }
}
