import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {App} from './app';
import {SearchEngine} from './backend/search-engine';
import {Configuration} from './configuration';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .basicConfiguration()
    .history()
    .globalResources([
      './resources/drop-down',
      './resources/side-bar',
      './resources/side-bar-view.html',
      './resources/screen-activator',
      './resources/search-trigger',
      './resources/search-box',
      './resources/search-panel',
      './resources/no-search-results.html',
      './resources/api-search-results.html',
      './resources/code-listing',
      './resources/au-demo',
      './resources/blog-sidebar',
      './resources/blog-footer.html'
    ]);

  aurelia.use.developmentLogging(environment.debug ? 'info' : 'warn');

  aurelia.start().then(() => {
    let container = aurelia.container;
    let app = <App>container.get(App);
    let configuration = <Configuration>container.get(Configuration);

    if (configuration.search) {
      let searchEngine = <SearchEngine>container.get(SearchEngine);
      searchEngine.getIndexes(); //pre-load the search index as soon as possible, but do not block
    }

    aurelia.enhance(app, 'app-host').then(() => app.activate());
  });
}
