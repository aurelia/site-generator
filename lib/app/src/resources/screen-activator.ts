import {inject, Container} from 'aurelia-dependency-injection';
import {
  TemplatingEngine,
  ViewSlot, 
  ViewStrategy, 
  ViewEngine, 
  ViewLocator, 
  ViewFactory, 
  SwapStrategies, 
  processContent, 
  bindable,
  noView
} from 'aurelia-templating';

let compileInstruction = {
  associatedModuleId: null, 
  compileSurrogate: false, 
  targetShadowDOM: false
};

let processedIntialContent = false;

@inject(Element, Container, TemplatingEngine, ViewLocator, ViewEngine, ViewSlot)
@processContent(false)
@noView()
export class ScreenActivator {
  @bindable activeScreen: any = null;

  constructor(private element: HTMLElement, private container: Container, private templatingEngine: TemplatingEngine, private viewLocator: ViewLocator, private viewEngine: ViewEngine, private viewSlot: ViewSlot) { }

  activeScreenChanged(newValue) {
    if (!newValue) {
      return;
    }

    if (!processedIntialContent) {
      processedIntialContent = true;

      //NOTE: this if block is for running in dev mode
      let target = this.element.firstElementChild;
      if (!target) {
        target = document.createElement('div');
        this.element.replaceChild(target, this.element.firstChild);
      }

      let view = this.templatingEngine.enhance({
        element: target,
        container: this.container.createChild(),
        bindingContext: newValue
      });
      
      (<any>this.viewSlot).children.push(view);

      //HACK: This should be part of the enhance logic...
      (<any>view).firstChild = (<any>view).lastChild = view.fragment;
      view.fragment = document.createDocumentFragment();
      view.attached();
      //HACK

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
