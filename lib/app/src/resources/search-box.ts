import {bindable, ElementEvents} from 'aurelia-templating';
import {autoinject} from 'aurelia-dependency-injection';

@autoinject
export class SearchBox {
  searchBox: HTMLInputElement;

  @bindable value: string = '';
  @bindable placeholder: string = '';

  constructor(private events: ElementEvents) { }

  valueChanged(newValue) {
    this.events.publish('search', newValue);
  }

  clear(event: Event) {
    this.value = '';
    this.searchBox.focus();
    event.stopPropagation();
  }

  focus() {
    this.searchBox.focus();
  }
}
