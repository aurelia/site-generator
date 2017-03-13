import {autoinject, Container} from 'aurelia-dependency-injection';
import {ViewSlot, ViewStrategy, ViewEngine, ViewLocator, ViewFactory, SwapStrategies} from 'aurelia-templating';

let compileInstruction = {
  associatedModuleId: null, 
  compileSurrogate: false, 
  targetShadowDOM: false
};

let processedInitialLoad = false;

@autoinject
export class ActiveScreenCustomAttribute {
  constructor(private container: Container, private viewLocator: ViewLocator, private viewEngine: ViewEngine, private viewSlot: ViewSlot) { }

  valueChanged(newValue) {
    if (!newValue) {
      return;
    }

    if (!processedInitialLoad) {
      this.viewSlot.transformChildNodesIntoView();
      processedInitialLoad = true;
      return;
    }
    
    Promise.resolve(newValue.activate())
      .then(() => {
        let strategy = this.viewLocator.getViewStrategy(newValue);
        return strategy.loadViewFactory(this.viewEngine, compileInstruction);
      }).then((viewFactory: ViewFactory) => {
        let childContainer = this.container.createChild();
        let view = viewFactory.create(childContainer);

        let swapStrategy = SwapStrategies.after;
        let previousViews = (<any>this.viewSlot).children.slice();

        return swapStrategy(this.viewSlot, previousViews, () => this.viewSlot.add(view));
      });
  }
}
