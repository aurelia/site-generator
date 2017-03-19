import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {observable} from 'aurelia-binding';
import {ShowSearch, HideSearch} from '../messages/shell';
import {SearchEngine} from '../backend/search-engine';

@autoinject
export class SearchPanel {
  isActive = false;
  searchBox: HTMLInputElement;
  searchResults;
  onHide = event => this.hide();

  @observable value: string = '';

  constructor(ea: EventAggregator, private searchEngine: SearchEngine) { 
    ea.subscribe(ShowSearch, () => this.show());
    ea.subscribe(HideSearch, () => this.hide());
  }

  valueChanged(newValue) {
    this.search(newValue);
  }

  search(query) {
    if (!query) {
      this.searchResults = null;
    } else {
      this.searchEngine.search(query).then(x => this.searchResults = x);
      console.log(query);
    }
  }

  clear() {
    this.value = '';
    this.searchBox.focus();
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
