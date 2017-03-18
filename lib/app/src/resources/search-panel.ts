import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {ShowSearch, HideSearch} from '../messages/shell';

@autoinject
export class SearchPanel {
  isActive = false;
  searchBox: HTMLInputElement;
  onHide = event => this.hide();

  constructor(ea: EventAggregator) { 
    ea.subscribe(ShowSearch, () => this.show());
    ea.subscribe(HideSearch, () => this.hide());
  }

  search() {
    
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
