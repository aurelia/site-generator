# Testing Module

## Classes


### CompileSpy

Attribute to be placed on any element to have it emit the View Compiler&#x27;s
TargetInstruction into the debug console, giving you insight into all the
parsed bindings, behaviors and event handers for the targeted element.

#### Properties


#### Methods



### ComponentTester

No description available.

#### Properties

* `attached: ` - No description available.
* `bind: ` - No description available.
* `configure: any` - No description available.
* `element: Element` - No description available.
* `unbind: ` - No description available.
* `viewModel: any` - No description available.

#### Methods


* `bootstrap(configure: ): any` - 
  * `configure: ` - No description available


* `boundTo(bindingContext: any): ComponentTester` - 
  * `bindingContext: any` - No description available


* `create(bootstrap: ): Promise` - 
  * `bootstrap: ` - No description available


* `dispose(): any` - 


* `inView(html: string): ComponentTester` - 
  * `html: string` - No description available


* `manuallyHandleLifecycle(): ComponentTester` - 


* `waitForElement(selector: string, options: any): Promise` - 
  * `selector: string` - No description available
  * `options: any` - No description available


* `waitForElements(selector: string, options: any): Promise` - 
  * `selector: string` - No description available
  * `options: any` - No description available


* `withResources(resources: ): ComponentTester` - 
  * `resources: ` - No description available



### StageComponent

No description available.

#### Properties


#### Methods


* `static withResources(resources?: ): ComponentTester` - 
  * `resources?: ` - No description available



### ViewSpy

Attribute to be placed on any HTML element in a view to emit the View instance
to the debug console, giving you insight into the live View instance, including
all child views, live bindings, behaviors and more.

#### Properties


#### Methods


* `attached(): any` - Invoked when the target element is attached to the DOM.


* `bind(bindingContext?: any): any` - Invoked when the target view is bound.
  * `bindingContext?: any` - The target view&#x27;s binding context.



* `created(view?: any): any` - Invoked when the target view is created.
  * `view?: any` - The target view.



* `detached(): any` - Invoked when the target element is detached from the DOM.


* `unbind(): any` - Invoked when the target element is unbound.



## Interfaces


## Constants


## Functions


* `waitFor(getter: , options: any): Promise` - Generic function to wait for something to happen. Uses polling
  * `getter: ` - No description available.
  * `options: any` - No description available.


* `waitForDocumentElement(selector: string, options: any): Promise` - 
  * `selector: string` - No description available.
  * `options: any` - No description available.


* `waitForDocumentElements(selector: string, options: any): Promise` - 
  * `selector: string` - No description available.
  * `options: any` - No description available.

