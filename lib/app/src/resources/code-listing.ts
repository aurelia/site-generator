import {processContent, bindable, TargetInstruction} from 'aurelia-templating';
import {inject} from 'aurelia-dependency-injection';
import {SourceCode} from './source-code';
import {Configuration} from '../configuration';

@inject(Configuration, Element, TargetInstruction)
@processContent(SourceCode.processContent)
export class CodeListing {
  @bindable heading = null;
  
  availableSources: SourceCode[] = null;
  selectedSource: SourceCode = null;
  subscription;

  _code: HTMLDivElement;

  get code() : HTMLDivElement {
    if (!this._code) {
      this._code = <HTMLDivElement>this.element.getElementsByClassName('code-container')[0];
    }

    return this._code;
  }

  constructor(private config: Configuration, private element: Element, instruction: TargetInstruction) {
    this.availableSources = instruction.elementInstruction['availableSources'];
  }

  bind(bindingContext) {
    let previousSibling = this.element.previousElementSibling;
    if (previousSibling && previousSibling.localName === this.element.localName) {
      previousSibling.classList.add('group-next-sibling');
    }

    this.selectSourceForLanguage();
    this.subscription = this.config.subscribeToActiveLanguageChanged(() => this.selectSourceForLanguage()); 
  }

  unbind() {
    this.subscription.dispose();
  }

  selectSourceForLanguage() {
    let found: SourceCode;
    let priorities = [
      this.config.activeLanguage,
      'ES 2015/2016',
      'ES 2015/ES Next',
      'ES 2016/TypeScript',
      'ES 2015/ES 2016/TypeScript',
      'ES Next',
      'ES 2016',
      'ES 2015',
      'TypeScript',
      'HTML'
    ];

    for (let i = 0, ii = priorities.length; i < ii; ++i) {
      found = this.availableSources.find(x => x.lang === priorities[i]);
      if (found) {
        break;
      }
    }

    this.select(found || this.availableSources[0]);
  }

  select(source: SourceCode) {
    this.selectedSource = source;
    this.code.innerHTML = source.code;
  }
}
