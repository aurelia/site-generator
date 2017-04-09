import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {App} from './app';
import {SearchEngine} from './backend/search-engine';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .basicConfiguration()
    .history()
    .globalResources([
      './resources/side-bar',
      './resources/side-bar-view.html',
      './resources/screen-activator',
      './resources/search-trigger',
      './resources/search-panel',
      './resources/account-indicator',
      './resources/source-code'
    ]);

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }
  
  aurelia.start().then(() => {
    let container = aurelia.container;
    let searchEngine = <SearchEngine>container.get(SearchEngine);
    let app = <App>container.get(App);

    searchEngine.getIndexes(); //pre-load the search index as soon as possible, but do not block
    aurelia.enhance(app, 'app-host').then(() => app.activate());
  });
}
