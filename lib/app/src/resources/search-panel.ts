import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {observable} from 'aurelia-binding';
import {ShowSearch, HideSearch} from '../messages/shell';
import {SearchEngine} from '../backend/search-engine';
import {SearchBox} from './search-box';

@autoinject
export class SearchPanel {
  isActive = false;
  searchResults;
  onHide = event => this.hide();
  searchBox: SearchBox;
  query: string;

  constructor(ea: EventAggregator, private searchEngine: SearchEngine) { 
    ea.subscribe(ShowSearch, () => this.show());
    ea.subscribe(HideSearch, () => this.hide());
  }

  search(event) {
    this.query = event.detail;

    if (!this.query) {
      this.searchResults = null;
    } else {
      this.searchEngine.search(this.query).then(x => this.searchResults = x);
    }
  }

  show() {
    if (this.isActive) {
      return;
    }
    
    this.isActive = true;
    
    setTimeout(() => {
      document.addEventListener('click', this.onHide);
      this.searchBox.focus();
    }, 250);
  }

  hide() {
    if (!this.isActive) {
      return;
    }
    
    this.isActive = false;
    document.removeEventListener('click', this.onHide);
  }
}
