import {Loader} from 'aurelia-loader';
import {bindable, TargetInstruction, processContent} from 'aurelia-templating';
import {autoinject} from 'aurelia-dependency-injection';
import {SourceCode} from './source-code';
import {Container} from 'aurelia-dependency-injection';
import {Aurelia} from 'aurelia-framework';

@autoinject
@processContent(SourceCode.processContent)
export class AuDemo {
  @bindable heading;

  sourceCode: SourceCode;
  host: HTMLDivElement;
  app: Aurelia;

  constructor(private loader: Loader, instruction: TargetInstruction) {
    this.sourceCode = instruction.elementInstruction['availableSources'][0];
  }

  bind(bindingContext) {
    this.app = new Aurelia(this.loader, new Container());
    this.app.use.basicConfiguration();
    this.app.start().then(a => a.setRoot(this.sourceCode.src, this.host));
  }
}
