# Templating Module

## Classes


### Animator

An abstract class representing a mechanism for animating the DOM during various DOM state transitions.

#### Properties


#### Methods


* `addClass(element: HTMLElement, className: string): Promise` - Add a class to an element to trigger an animation.
  * `element:HTMLElement` - Element to animate
  * `className:string` - Properties to animate or name of the effect to use


* `animate(element: , className: string): Promise` - Execute a single animation.
  * `element:` - Element to animate
  * `className:string` - Properties to animate or name of the effect to use. For css animators this represents the className to be added and removed right after the animation is done.


* `enter(element: HTMLElement): Promise` - Execute an &#x27;enter&#x27; animation on an element
  * `element:HTMLElement` - Element to animate


* `leave(element: HTMLElement): Promise` - Execute a &#x27;leave&#x27; animation on an element
  * `element:HTMLElement` - Element to animate


* `registerEffect(effectName: string, properties: Object): void` - Register an effect (for JS based animators)
  * `effectName:string` - identifier of the effect
  * `properties:Object` - Object with properties for the effect



* `removeClass(element: HTMLElement, className: string): Promise` - Add a class to an element to trigger an animation.
  * `element:HTMLElement` - Element to animate
  * `className:string` - Properties to animate or name of the effect to use


* `runSequence(animations: Array): Promise` - Run a sequence of animations one after the other.
for example: animator.runSequence(&quot;fadeIn&quot;,&quot;callout&quot;)
  * `animations:Array` - No description available


* `unregisterEffect(effectName: string): void` - Unregister an effect (for JS based animators)
  * `effectName:string` - identifier of the effect




### BehaviorInstruction

Indicates how a custom attribute or element should be instantiated in a view.

#### Properties

* `anchorIsContainer:boolean` - No description available.
* `attrName:string` - No description available.
* `attributes:Object` - No description available.
* `contentFactory:any` - No description available.
* `enhance:boolean` - No description available.
* `host:Element` - No description available.
* `inheritBindingContext:boolean` - No description available.
* `initiatedByBehavior:boolean` - No description available.
* `originalAttrName:string` - No description available.
* `partReplacements:any` - No description available.
* `skipContentProcessing:boolean` - No description available.
* `type:HtmlBehaviorResource` - No description available.
* `viewFactory:ViewFactory` - No description available.
* `viewModel:Object` - No description available.
* `normal:BehaviorInstruction` - A default behavior used in scenarios where explicit configuration isn&#x27;t available.

#### Methods


* `attribute(attrName: string, type?: HtmlBehaviorResource): BehaviorInstruction` - Creates a custom attribute instruction.
  * `attrName:string` - The name of the attribute.
  * `type?:HtmlBehaviorResource` - The HtmlBehaviorResource to create.


* `dynamic(host: Element, viewModel: Object, viewFactory: ViewFactory): BehaviorInstruction` - Creates a dynamic component instruction.
  * `host:Element` - The element that will parent the dynamic component.
  * `viewModel:Object` - The dynamic component&#x27;s view model instance.
  * `viewFactory:ViewFactory` - A view factory used in generating the component&#x27;s view.


* `element(node: Node, type: HtmlBehaviorResource): BehaviorInstruction` - Creates a custom element instruction.
  * `node:Node` - The node that represents the custom element.
  * `type:HtmlBehaviorResource` - The HtmlBehaviorResource to create.


* `enhance(): BehaviorInstruction` - Creates an instruction for element enhancement.


* `unitTest(type: HtmlBehaviorResource, attributes: Object): BehaviorInstruction` - Creates an instruction for unit testing.
  * `type:HtmlBehaviorResource` - The HtmlBehaviorResource to create.
  * `attributes:Object` - A key/value lookup of attributes for the behaior.



### BehaviorPropertyObserver

An implementation of Aurelia&#x27;s Observer interface that is used to back bindable properties defined on a behavior.

#### Properties


#### Methods


* `call(): void` - Invoked by the TaskQueue to publish changes to subscribers.


* `getValue(): any` - Gets the property&#x27;s value.


* `setValue(newValue: any): void` - Sets the property&#x27;s value.
  * `newValue:any` - The new value to set.



* `subscribe(context: any, callable: Function): void` - Subscribes to the observerable.
  * `context:any` - A context object to pass along to the subscriber when it&#x27;s called.
  * `callable:Function` - A function or object with a &quot;call&quot; method to be invoked for delivery of changes.



* `unsubscribe(context: any, callable: Function): void` - Unsubscribes from the observerable.
  * `context:any` - The context object originally subscribed with.
  * `callable:Function` - The callable that was originally subscribed with.




### BindableProperty

Represents a bindable property on a behavior.

#### Properties


#### Methods


* `createObserver(viewModel: Object): BehaviorPropertyObserver` - Creates an observer for this property.
  * `viewModel:Object` - The view model instance on which to create the observer.


* `defineOn(target: Function, behavior: HtmlBehaviorResource): void` - Defines this property on the specified class and behavior.
  * `target:Function` - The class to define the property on.
  * `behavior:HtmlBehaviorResource` - The behavior to define the property on.



* `registerWith(target: Function, behavior: HtmlBehaviorResource, descriptor?: Object): void` - Registers this bindable property with particular Class and Behavior instance.
  * `target:Function` - The class to register this behavior with.
  * `behavior:HtmlBehaviorResource` - The behavior instance to register this property with.
  * `descriptor?:Object` - The property descriptor for this property.




### BindingLanguage

An abstract base class for implementations of a binding language.

#### Properties


#### Methods


* `createAttributeInstruction(resources: ViewResources, element: Element, info: Object, existingInstruction?: Object): BehaviorInstruction` - Creates an attribute behavior instruction.
  * `resources:ViewResources` - The ViewResources for the view being compiled.
  * `element:Element` - The element that the attribute is defined on.
  * `info:Object` - The info object previously returned from inspectAttribute.
  * `existingInstruction?:Object` - A previously created instruction for this attribute.


* `inspectAttribute(resources: ViewResources, elementName: string, attrName: string, attrValue: string): Object` - Inspects an attribute for bindings.
  * `resources:ViewResources` - The ViewResources for the view being compiled.
  * `elementName:string` - The element name to inspect.
  * `attrName:string` - The attribute name to inspect.
  * `attrValue:string` - The attribute value to inspect.


* `inspectTextContent(resources: ViewResources, value: string): Object` - Parses the text for bindings.
  * `resources:ViewResources` - The ViewResources for the view being compiled.
  * `value:string` - The value of the text to parse.



### BoundViewFactory

A factory capable of creating View instances, bound to a location within another view hierarchy.

#### Properties

* `isCaching:any` - Indicates whether this factory is currently using caching.

#### Methods


* `create(): View` - Creates a view or returns one from the internal cache, if available.


* `getCachedView(): View` - Gets a cached view if available...


* `returnViewToCache(view: View): void` - Returns a view to the cache.
  * `view:View` - The view to return to the cache if space is available.



* `setCacheSize(size: , doNotOverrideIfAlreadySet: boolean): void` - Sets the cache size for this factory.
  * `size:` - The number of views to cache or &quot;*&quot; to cache all.
  * `doNotOverrideIfAlreadySet:boolean` - Indicates that setting the cache should not override the setting if previously set.




### CompositionEngine

Used to dynamically compose components.

#### Properties


#### Methods


* `compose(context: CompositionContext): Promise` - Dynamically composes a component.
  * `context:CompositionContext` - The CompositionContext providing information on how the composition should occur.


* `createController(context: CompositionContext): Promise` - Creates a controller instance for the component described in the context.
  * `context:CompositionContext` - The CompositionContext that describes the component.


* `ensureViewModel(context: CompositionContext): Promise` - Ensures that the view model and its resource are loaded for this context.
  * `context:CompositionContext` - The CompositionContext to load the view model and its resource for.



### CompositionTransaction

Enables an initiator of a view composition to track any internal async rendering processes for completion.

#### Properties


#### Methods


* `enlist(): CompositionTransactionNotifier` - Enlist an async render operation into the transaction.


* `tryCapture(): CompositionTransactionOwnershipToken` - Attempt to take ownership of the composition transaction.



### CompositionTransactionNotifier

A mechanism by which an enlisted async render operation can notify the owning transaction when its work is done.

#### Properties


#### Methods


* `done(): void` - Notifies the owning transaction that its work is done.



### CompositionTransactionOwnershipToken

Referenced by the subsytem which wishes to control a composition transaction.

#### Properties


#### Methods


* `resolve(): void` - Used internall to resolve the composition complete promise.


* `waitForCompositionComplete(): Promise` - Allows the transaction owner to wait for the completion of all child compositions.



### Controller

Controls a view model (and optionally its view), according to a particular behavior and by following a set of instructions.

#### Properties

* `behavior:HtmlBehaviorResource` - The HtmlBehaviorResource that provides the base behavior for this controller.
* `view:View` - The view associated with the component being controlled by this controller.
Note: Not all components will have a view, so the value may be null.
* `viewModel:Object` - The developer&#x27;s view model instance which provides the custom behavior for this controller.

#### Methods


* `attached(): void` - Attaches the controller.


* `automate(overrideContext?: Object, owningView?: View): void` - Used to automate the proper binding of this controller and its view. Used by the composition engine for dynamic component creation.
This should be considered a semi-private API and is subject to change without notice, even across minor or patch releases.
  * `overrideContext?:Object` - An override context for binding.
  * `owningView?:View` - The view inside which this controller resides.



* `bind(scope: Object): void` - Binds the controller to the scope.
  * `scope:Object` - The binding scope.



* `created(owningView: View): void` - Invoked when the view which contains this controller is created.
  * `owningView:View` - The view inside which this controller resides.



* `detached(): void` - Detaches the controller.


* `unbind(): void` - Unbinds the controller.



### ConventionalViewStrategy

A view strategy based on naming conventions.

#### Properties


#### Methods


* `loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext, target?: any): Promise` - Loads a view factory.
  * `viewEngine:ViewEngine` - The view engine to use during the load process.
  * `compileInstruction:ViewCompileInstruction` - Additional instructions to use during compilation of the view.
  * `loadContext?:ResourceLoadContext` - The loading context used for loading all resources and dependencies.
  * `target?:any` - A class from which to extract metadata of additional resources to load.



### ElementConfigResource

Identifies a class as a resource that configures the EventManager with information
about how events relate to properties for the purpose of two-way data-binding
to Web Components.

#### Properties


#### Methods


* `initialize(container: Container, target: Function): void` - Provides an opportunity for the resource to initialize iteself.
  * `container:Container` - The dependency injection container from which the resource
can aquire needed services.
  * `target:Function` - The class to which this resource metadata is attached.



* `load(container: Container, target: Function): void` - Enables the resource to asynchronously load additional resources.
  * `container:Container` - The dependency injection container from which the resource
can aquire needed services.
  * `target:Function` - The class to which this resource metadata is attached.



* `register(registry: ViewResources, name?: string): void` - Allows the resource to be registered in the view resources for the particular
view into which it was required.
  * `registry:ViewResources` - The view resource registry for the view that required this resource.
  * `name?:string` - The name provided by the end user for this resource, within the
particular view it&#x27;s being used.




### ElementEvents

Dispatches subscribets to and publishes events in the DOM.

#### Properties


#### Methods


* `dispose(eventName: string): void` - Removes all events that are listening to the specified eventName.
  * `eventName:string` - 



* `disposeAll(): any` - Removes all event handlers.


* `publish(eventName: string, detail?: Object, bubbles?: boolean, cancelable?: boolean): any` - Dispatches an Event on the context element.
  * `eventName:string` - No description available
  * `detail?:Object` - No description available
  * `bubbles?:boolean` - No description available
  * `cancelable?:boolean` - 



* `subscribe(eventName: string, handler: Function, bubbles?: boolean): EventHandler` - Adds and Event Listener on the context element.
  * `eventName:string` - No description available
  * `handler:Function` - No description available
  * `bubbles?:boolean` - No description available


* `subscribeOnce(eventName: String, handler: Function, bubbles?: Boolean): EventHandler` - Adds an Event Listener on the context element, that will be disposed on the first trigger.
  * `eventName:String` - No description available
  * `handler:Function` - No description available
  * `bubbles?:Boolean` - No description available



### HtmlBehaviorResource

Identifies a class as a resource that implements custom element or custom
attribute functionality.

#### Properties


#### Methods


* `addChildBinding(behavior: Object): void` - Adds a binding expression to the component created by this resource.
  * `behavior:Object` - The binding expression.



* `compile(compiler: ViewCompiler, resources: ViewResources, node: Node, instruction: BehaviorInstruction, parentNode?: Node): Node` - Plugs into the compiler and enables custom processing of the node on which this behavior is located.
  * `compiler:ViewCompiler` - The compiler that is currently compiling the view that this behavior exists within.
  * `resources:ViewResources` - The resources for the view that this behavior exists within.
  * `node:Node` - The node on which this behavior exists.
  * `instruction:BehaviorInstruction` - The behavior instruction created for this behavior.
  * `parentNode?:Node` - The parent node of the current node.


* `create(container: Container, instruction?: BehaviorInstruction, element?: Element, bindings?: Binding): Controller` - Creates an instance of this behavior.
  * `container:Container` - The DI container to create the instance in.
  * `instruction?:BehaviorInstruction` - The instruction for this behavior that was constructed during compilation.
  * `element?:Element` - The element on which this behavior exists.
  * `bindings?:Binding` - The bindings that are associated with the view in which this behavior exists.


* `initialize(container: Container, target: Function): void` - Provides an opportunity for the resource to initialize iteself.
  * `container:Container` - The dependency injection container from which the resource
can aquire needed services.
  * `target:Function` - The class to which this resource metadata is attached.



* `load(container: Container, target: Function, loadContext?: ResourceLoadContext, viewStrategy?: ViewStrategy, transientView?: boolean): Promise` - Enables the resource to asynchronously load additional resources.
  * `container:Container` - The dependency injection container from which the resource
can aquire needed services.
  * `target:Function` - The class to which this resource metadata is attached.
  * `loadContext?:ResourceLoadContext` - The loading context object provided by the view engine.
  * `viewStrategy?:ViewStrategy` - A view strategy to overload the default strategy defined by the resource.
  * `transientView?:boolean` - Indicated whether the view strategy is transient or
permanently tied to this component.



* `register(registry: ViewResources, name?: string): void` - Allows the resource to be registered in the view resources for the particular
view into which it was required.
  * `registry:ViewResources` - The view resource registry for the view that required this resource.
  * `name?:string` - The name provided by the end user for this resource, within the
particular view it&#x27;s being used.



* `convention(name: string, existing?: HtmlBehaviorResource): HtmlBehaviorResource` - Checks whether the provided name matches any naming conventions for HtmlBehaviorResource.
  * `name:string` - The name of the potential resource.
  * `existing?:HtmlBehaviorResource` - An already existing resource that may need a convention name applied.




### InlineViewStrategy

A view strategy that allows the component authore to inline the html for the view.

#### Properties


#### Methods


* `loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext, target?: any): Promise` - Loads a view factory.
  * `viewEngine:ViewEngine` - The view engine to use during the load process.
  * `compileInstruction:ViewCompileInstruction` - Additional instructions to use during compilation of the view.
  * `loadContext?:ResourceLoadContext` - The loading context used for loading all resources and dependencies.
  * `target?:any` - A class from which to extract metadata of additional resources to load.



### ModuleAnalyzer

Analyzes a module in order to discover the view resources that it exports.

#### Properties


#### Methods


* `analyze(moduleId: string, moduleInstance: any, mainResourceKey?: string): ResourceModule` - Analyzes a module.
  * `moduleId:string` - The id of the module to analyze.
  * `moduleInstance:any` - The module instance to analyze.
  * `mainResourceKey?:string` - The name of the main resource.


* `getAnalysis(moduleId: string): ResourceModule` - Retrieves the ResourceModule analysis for a previously analyzed module.
  * `moduleId:string` - The id of the module to lookup.



### NoViewStrategy

A view strategy that indicates that the component has no view that the templating engine needs to manage.
Typically used when the component author wishes to take over fine-grained rendering control.

#### Properties


#### Methods


* `loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext, target?: any): Promise` - Loads a view factory.
  * `viewEngine:ViewEngine` - The view engine to use during the load process.
  * `compileInstruction:ViewCompileInstruction` - Additional instructions to use during compilation of the view.
  * `loadContext?:ResourceLoadContext` - The loading context used for loading all resources and dependencies.
  * `target?:any` - A class from which to extract metadata of additional resources to load.



### PassThroughSlot

No description available.

#### Properties

* `needsFallbackRendering:any` - No description available.

#### Methods


* `addNode(view?: any, node?: any, projectionSource?: any, index?: any): any` - 
  * `view?:any` - No description available
  * `node?:any` - No description available
  * `projectionSource?:any` - No description available
  * `index?:any` - No description available


* `attached(): any` - 


* `bind(view?: any): any` - 
  * `view?:any` - No description available


* `created(ownerView?: any): any` - 
  * `ownerView?:any` - No description available


* `detached(): any` - 


* `passThroughTo(destinationSlot?: any): any` - 
  * `destinationSlot?:any` - No description available


* `projectFrom(view?: any, projectionSource?: any): any` - 
  * `view?:any` - No description available
  * `projectionSource?:any` - No description available


* `removeAll(projectionSource?: any): any` - 
  * `projectionSource?:any` - No description available


* `removeView(view?: any, projectionSource?: any): any` - 
  * `view?:any` - No description available
  * `projectionSource?:any` - No description available


* `renderFallbackContent(view?: any, nodes?: any, projectionSource?: any, index?: any): any` - 
  * `view?:any` - No description available
  * `nodes?:any` - No description available
  * `projectionSource?:any` - No description available
  * `index?:any` - No description available


* `unbind(): any` - 



### RelativeViewStrategy

A view strategy that loads a view relative to its associated view-model.

#### Properties


#### Methods


* `loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext, target?: any): Promise` - Loads a view factory.
  * `viewEngine:ViewEngine` - The view engine to use during the load process.
  * `compileInstruction:ViewCompileInstruction` - Additional instructions to use during compilation of the view.
  * `loadContext?:ResourceLoadContext` - The loading context used for loading all resources and dependencies.
  * `target?:any` - A class from which to extract metadata of additional resources to load.


* `makeRelativeTo(file: string): void` - Makes the view loaded by this strategy relative to the provided file path.
  * `file:string` - The path to load the view relative to.




### ResourceDescription

Represents a single view resource with a ResourceModule.

#### Properties


#### Methods


* `initialize(container: Container): void` - Initializes the resource.
  * `container:Container` - The dependency injection container usable during resource initialization.



* `load(container: Container, loadContext?: ResourceLoadContext): ` - Loads any dependencies of the resource.
  * `container:Container` - The DI container to use during dependency resolution.
  * `loadContext?:ResourceLoadContext` - The loading context used for loading all resources and dependencies.


* `register(registry: ViewResources, name?: string): void` - Registrers the resource with the view resources.
  * `registry:ViewResources` - The registry of view resources to regiser within.
  * `name?:string` - The name to use in registering the resource.




### ResourceLoadContext

A context that flows through the view resource load process.

#### Properties

* `dependencies:Object` - No description available.

#### Methods


* `addDependency(url: string): void` - Tracks a dependency that is being loaded.
  * `url:string` - The url of the dependency.



* `hasDependency(url: string): boolean` - Checks if the current context includes a load of the specified url.
  * `url:string` - No description available



### ResourceModule

Represents a module with view resources.

#### Properties


#### Methods


* `initialize(container: Container): void` - Initializes the resources within the module.
  * `container:Container` - The dependency injection container usable during resource initialization.



* `load(container: Container, loadContext?: ResourceLoadContext): Promise` - Loads any dependencies of the resources within this module.
  * `container:Container` - The DI container to use during dependency resolution.
  * `loadContext?:ResourceLoadContext` - The loading context used for loading all resources and dependencies.


* `register(registry: ViewResources, name?: string): void` - Registers the resources in the module with the view resources.
  * `registry:ViewResources` - The registry of view resources to regiser within.
  * `name?:string` - The name to use in registering the default resource.




### ShadowDOM

No description available.

#### Properties

* `defaultSlotKey:any` - No description available.

#### Methods


* `distributeNodes(view?: any, nodes?: any, slots?: any, projectionSource?: any, index?: any, destinationOverride?: any): any` - 
  * `view?:any` - No description available
  * `nodes?:any` - No description available
  * `slots?:any` - No description available
  * `projectionSource?:any` - No description available
  * `index?:any` - No description available
  * `destinationOverride?:any` - No description available


* `distributeView(view?: any, slots?: any, projectionSource?: any, index?: any, destinationOverride?: any): any` - 
  * `view?:any` - No description available
  * `slots?:any` - No description available
  * `projectionSource?:any` - No description available
  * `index?:any` - No description available
  * `destinationOverride?:any` - No description available


* `getSlotName(node?: any): any` - 
  * `node?:any` - No description available


* `undistributeAll(slots?: any, projectionSource?: any): any` - 
  * `slots?:any` - No description available
  * `projectionSource?:any` - No description available


* `undistributeView(view?: any, slots?: any, projectionSource?: any): any` - 
  * `view?:any` - No description available
  * `slots?:any` - No description available
  * `projectionSource?:any` - No description available



### ShadowSlot

No description available.

#### Properties

* `needsFallbackRendering:any` - No description available.

#### Methods


* `addNode(view?: any, node?: any, projectionSource?: any, index?: any, destination?: any): any` - 
  * `view?:any` - No description available
  * `node?:any` - No description available
  * `projectionSource?:any` - No description available
  * `index?:any` - No description available
  * `destination?:any` - No description available


* `attached(): any` - 


* `bind(view?: any): any` - 
  * `view?:any` - No description available


* `created(ownerView?: any): any` - 
  * `ownerView?:any` - No description available


* `detached(): any` - 


* `projectFrom(view?: any, projectionSource?: any): any` - 
  * `view?:any` - No description available
  * `projectionSource?:any` - No description available


* `projectTo(slots?: any): any` - 
  * `slots?:any` - No description available


* `removeAll(projectionSource?: any): any` - 
  * `projectionSource?:any` - No description available


* `removeView(view?: any, projectionSource?: any): any` - 
  * `view?:any` - No description available
  * `projectionSource?:any` - No description available


* `renderFallbackContent(view?: any, nodes?: any, projectionSource?: any, index?: any): any` - 
  * `view?:any` - No description available
  * `nodes?:any` - No description available
  * `projectionSource?:any` - No description available
  * `index?:any` - No description available


* `unbind(): any` - 



### SlotCustomAttribute

No description available.

#### Properties


#### Methods


* `valueChanged(newValue?: any, oldValue?: any): any` - 
  * `newValue?:any` - No description available
  * `oldValue?:any` - No description available



### TargetInstruction

Provides all the instructions for how a target element should be enhanced inside of a view.

#### Properties

* `anchorIsContainer:boolean` - No description available.
* `behaviorInstructions:Array` - No description available.
* `contentExpression:any` - No description available.
* `elementInstruction:BehaviorInstruction` - No description available.
* `expressions:Array` - No description available.
* `injectorId:number` - No description available.
* `lifting:boolean` - No description available.
* `parentInjectorId:number` - No description available.
* `providers:Array` - No description available.
* `shadowSlot:boolean` - No description available.
* `slotFallbackFactory:any` - No description available.
* `slotName:string` - No description available.
* `values:Object` - No description available.
* `viewFactory:ViewFactory` - No description available.
* `noExpressions:any` - An empty array used to represent a target with no binding expressions.

#### Methods


* `contentExpression(expression?: any): TargetInstruction` - Creates an instruction that represents a binding expression in the content of an element.
  * `expression?:any` - The binding expression.


* `lifting(parentInjectorId: number, liftingInstruction: BehaviorInstruction): TargetInstruction` - Creates an instruction that represents content that was lifted out of the DOM and into a ViewFactory.
  * `parentInjectorId:number` - The id of the parent dependency injection container.
  * `liftingInstruction:BehaviorInstruction` - The behavior instruction of the lifting behavior.


* `normal(injectorId: number, parentInjectorId: number, providers: Array, behaviorInstructions: Array, expressions: Array, elementInstruction: BehaviorInstruction): TargetInstruction` - Creates an instruction that represents an element with behaviors and bindings.
  * `injectorId:number` - The id of the dependency injection container.
  * `parentInjectorId:number` - The id of the parent dependency injection container.
  * `providers:Array` - The types which will provide behavior for this element.
  * `behaviorInstructions:Array` - The instructions for creating behaviors on this element.
  * `expressions:Array` - Bindings, listeners, triggers, etc.
  * `elementInstruction:BehaviorInstruction` - The element behavior for this element.


* `shadowSlot(parentInjectorId: number): TargetInstruction` - Creates an instruction that represents a shadow dom slot.
  * `parentInjectorId:number` - The id of the parent dependency injection container.


* `surrogate(providers: Array, behaviorInstructions: Array, expressions: Array, values: Object): TargetInstruction` - Creates an instruction that represents the surrogate behaviors and bindings for an element.
  * `providers:Array` - The types which will provide behavior for this element.
  * `behaviorInstructions:Array` - The instructions for creating behaviors on this element.
  * `expressions:Array` - Bindings, listeners, triggers, etc.
  * `values:Object` - A key/value lookup of attributes to transplant.



### TemplateRegistryViewStrategy

A view strategy created directly from the template registry entry.

#### Properties


#### Methods


* `loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext, target?: any): Promise` - Loads a view factory.
  * `viewEngine:ViewEngine` - The view engine to use during the load process.
  * `compileInstruction:ViewCompileInstruction` - Additional instructions to use during compilation of the view.
  * `loadContext?:ResourceLoadContext` - The loading context used for loading all resources and dependencies.
  * `target?:any` - A class from which to extract metadata of additional resources to load.



### TemplatingEngine

A facade of the templating engine capabilties which provides a more user friendly API for common use cases.

#### Properties


#### Methods


* `compose(context: CompositionContext): Promise` - Dynamically composes components and views.
  * `context:CompositionContext` - The composition context to use.


* `configureAnimator(animator: Animator): void` - Configures the default animator.
  * `animator:Animator` - The animator instance.



* `enhance(instruction: ): View` - Enhances existing DOM with behaviors and bindings.
  * `instruction:` - The element to enhance or a set of instructions for the enhancement process.



### View

No description available.

#### Properties

* `bindingContext:Object` - The primary binding context that this view is data-bound to.
* `container:Container` - The Dependency Injection Container that was used to create this View instance.
* `fragment:` - Contains the DOM Nodes which represent this View. If the view was created via the &quot;enhance&quot; API, this will be an Element, otherwise it will be a DocumentFragment. If not created via &quot;enhance&quot; then the fragment will only contain nodes when the View is detached from the DOM.
* `overrideContext:Object` - The override context which contains properties capable of overriding those found on the binding context.
* `viewFactory:ViewFactory` - The ViewFactory that built this View instance.

#### Methods


* `addBinding(binding: Object): void` - Adds a binding instance to this view.
  * `binding:Object` - The binding instance.



* `appendNodesTo(parent: Element): void` - Appends this view&#x27;s to the specified DOM node.
  * `parent:Element` - The parent element to append this view&#x27;s nodes to.



* `attached(): void` - Triggers the attach for the view and its children.


* `bind(bindingContext: Object, overrideContext?: Object, _systemUpdate?: boolean): void` - Binds the view and it&#x27;s children.
  * `bindingContext:Object` - The binding context to bind to.
  * `overrideContext?:Object` - A secondary binding context that can override the standard context.

  * `_systemUpdate?:boolean` - No description available


* `created(): void` - Triggers the created callback for this view and its children.


* `detached(): void` - Triggers the detach for the view and its children.


* `insertNodesBefore(refNode: Node): void` - Inserts this view&#x27;s nodes before the specified DOM node.
  * `refNode:Node` - The node to insert this view&#x27;s nodes before.



* `removeNodes(): void` - Removes this view&#x27;s nodes from the DOM.


* `returnToCache(): void` - Returns this view to the appropriate view cache.


* `unbind(): void` - Unbinds the view and its children.



### ViewCompileInstruction

Specifies how a view should be compiled.

#### Properties

* `associatedModuleId:any` - No description available.
* `compileSurrogate:boolean` - No description available.
* `targetShadowDOM:boolean` - No description available.
* `normal:ViewCompileInstruction` - The normal configuration for view compilation.

#### Methods



### ViewCompiler

Compiles html templates, dom fragments and strings into ViewFactory instances, capable of instantiating Views.

#### Properties


#### Methods


* `compile(source: , resources?: ViewResources, compileInstruction?: ViewCompileInstruction): ViewFactory` - Compiles an html template, dom fragment or string into ViewFactory instances, capable of instantiating Views.
  * `source:` - The template, fragment or string to compile.
  * `resources?:ViewResources` - The view resources used during compilation.
  * `compileInstruction?:ViewCompileInstruction` - A set of instructions that customize how compilation occurs.



### ViewEngine

Controls the view resource loading pipeline.

#### Properties

* `viewModelRequireMetadataKey:any` - The metadata key for storing requires declared in a ViewModel.

#### Methods


* `addResourcePlugin(extension: string, implementation: Object): void` - Adds a resource plugin to the resource loading pipeline.
  * `extension:string` - The file extension to match in require elements.
  * `implementation:Object` - The plugin implementation that handles the resource type.



* `importViewModelResource(moduleImport: string, moduleMember: string): Promise` - Loads a view model as a resource.
  * `moduleImport:string` - The module to import.
  * `moduleMember:string` - The export from the module to generate the resource for.


* `importViewResources(moduleIds: string, names: string, resources: ViewResources, compileInstruction?: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise` - Imports the specified resources with the specified names into the view resources object.
  * `moduleIds:string` - The modules to load.
  * `names:string` - The names associated with resource modules to import.
  * `resources:ViewResources` - The resources lookup to add the loaded resources to.
  * `compileInstruction?:ViewCompileInstruction` - The compilation instruction associated with the resource imports.
  * `loadContext?:ResourceLoadContext` - No description available


* `loadTemplateResources(registryEntry: TemplateRegistryEntry, compileInstruction?: ViewCompileInstruction, loadContext?: ResourceLoadContext, target?: any): Promise` - Loads all the resources specified by the registry entry.
  * `registryEntry:TemplateRegistryEntry` - The template registry entry to load the resources for.
  * `compileInstruction?:ViewCompileInstruction` - The compile instruction associated with the load.
  * `loadContext?:ResourceLoadContext` - The load context if this is happening within the context of a larger load operation.
  * `target?:any` - A class from which to extract metadata of additional resources to load.


* `loadViewFactory(urlOrRegistryEntry: , compileInstruction?: ViewCompileInstruction, loadContext?: ResourceLoadContext, target?: any): Promise` - Loads and compiles a ViewFactory from a url or template registry entry.
  * `urlOrRegistryEntry:` - A url or template registry entry to generate the view factory for.
  * `compileInstruction?:ViewCompileInstruction` - Instructions detailing how the factory should be compiled.
  * `loadContext?:ResourceLoadContext` - The load context if this factory load is happening within the context of a larger load operation.
  * `target?:any` - A class from which to extract metadata of additional resources to load.



### ViewEngineHooksResource

No description available.

#### Properties


#### Methods


* `initialize(container?: any, target?: any): any` - 
  * `container?:any` - No description available
  * `target?:any` - No description available


* `load(container?: any, target?: any): any` - 
  * `container?:any` - No description available
  * `target?:any` - No description available


* `register(registry?: any, name?: any): any` - 
  * `registry?:any` - No description available
  * `name?:any` - No description available


* `convention(name?: any): any` - 
  * `name?:any` - No description available



### ViewFactory

A factory capable of creating View instances.

#### Properties

* `isCaching:any` - Indicates whether this factory is currently using caching.

#### Methods


* `create(container: Container, createInstruction?: ViewCreateInstruction, element?: Element): View` - Creates a view or returns one from the internal cache, if available.
  * `container:Container` - The container to create the view from.
  * `createInstruction?:ViewCreateInstruction` - The instruction used to customize view creation.
  * `element?:Element` - The custom element that hosts the view.


* `getCachedView(): View` - Gets a cached view if available...


* `returnViewToCache(view: View): void` - Returns a view to the cache.
  * `view:View` - The view to return to the cache if space is available.



* `setCacheSize(size: , doNotOverrideIfAlreadySet: boolean): void` - Sets the cache size for this factory.
  * `size:` - The number of views to cache or &quot;*&quot; to cache all.
  * `doNotOverrideIfAlreadySet:boolean` - Indicates that setting the cache should not override the setting if previously set.




### ViewLocator

Locates a view for an object.

#### Properties

* `viewStrategyMetadataKey:any` - The metadata key for storing/finding view strategies associated with an class/object.

#### Methods


* `convertOriginToViewUrl(origin: Origin): string` - Conventionally converts a view model origin to a view url.
Used by the ConventionalViewStrategy.
  * `origin:Origin` - The origin of the view model to convert.


* `createFallbackViewStrategy(origin: Origin): ViewStrategy` - Creates a fallback View Strategy. Used when unable to locate a configured strategy.
The default implementation returns and instance of ConventionalViewStrategy.
  * `origin:Origin` - The origin of the view model to return the strategy for.


* `getViewStrategy(value: any): ViewStrategy` - Gets the view strategy for the value.
  * `value:any` - The value to locate the view strategy for.



### ViewResources

Represents a collection of resources used during the compilation of a view.

#### Properties

* `bindingLanguage:any` - A custom binding language used in the view.

#### Methods


* `getAttribute(attribute: string): HtmlBehaviorResource` - Gets an HTML attribute behavior.
  * `attribute:string` - The name of the attribute to lookup.


* `getBindingBehavior(name: string): Object` - Gets a binding behavior.
  * `name:string` - The name of the binding behavior.


* `getBindingLanguage(bindingLanguageFallback: BindingLanguage): BindingLanguage` - Gets the binding language associated with these resources, or return the provided fallback implementation.
  * `bindingLanguageFallback:BindingLanguage` - The fallback binding language implementation to use if no binding language is configured locally.


* `getElement(tagName: string): HtmlBehaviorResource` - Gets an HTML element behavior.
  * `tagName:string` - The tag name to search for.


* `getValue(name: string): any` - Gets a value.
  * `name:string` - The name of the value.


* `getValueConverter(name: string): Object` - Gets a value converter.
  * `name:string` - The name of the value converter.


* `mapAttribute(attribute: string): string` - Gets the known attribute name based on the local attribute name.
  * `attribute:string` - The local attribute name to lookup.


* `patchInParent(newParent: ViewResources): void` - Patches an immediate parent into the view resource resolution hierarchy.
  * `newParent:ViewResources` - The new parent resources to patch in.



* `registerAttribute(attribute: string, behavior: HtmlBehaviorResource, knownAttribute: string): void` - Registers an HTML attribute.
  * `attribute:string` - The name of the attribute.
  * `behavior:HtmlBehaviorResource` - The behavior of the attribute.
  * `knownAttribute:string` - The well-known name of the attribute (in lieu of the local name).



* `registerBindingBehavior(name: string, bindingBehavior: Object): void` - Registers a binding behavior.
  * `name:string` - The name of the binding behavior.
  * `bindingBehavior:Object` - The binding behavior instance.



* `registerElement(tagName: string, behavior: HtmlBehaviorResource): void` - Registers an HTML element.
  * `tagName:string` - The name of the custom element.
  * `behavior:HtmlBehaviorResource` - The behavior of the element.



* `registerValue(name: string, value: any): void` - Registers a value.
  * `name:string` - The name of the value.
  * `value:any` - The value.



* `registerValueConverter(name: string, valueConverter: Object): void` - Registers a value converter.
  * `name:string` - The name of the value converter.
  * `valueConverter:Object` - The value converter instance.



* `registerViewEngineHooks(hooks: ViewEngineHooks): void` - Registers view engine hooks for the view.
  * `hooks:ViewEngineHooks` - The hooks to register.



* `relativeToView(path: string): string` - Maps a path relative to the associated view&#x27;s origin.
  * `path:string` - The relative path.



### ViewSlot

Represents a slot or location within the DOM to which views can be added and removed.
Manages the view lifecycle for its children.

#### Properties


#### Methods


* `add(view: View): ` - Adds a view to the slot.
  * `view:View` - The view to add.


* `animateView(view: View, direction?: string): ` -   Runs the animator against the first animatable element found within the view&#x27;s fragment
  @param  view       The view to use when searching for the element.
  @param  direction  The animation direction enter|leave.
  @returns An animation complete Promise or undefined if no animation was run.
  * `view:View` - No description available
  * `direction?:string` - No description available


* `attached(): void` - Triggers the attach for the slot and its children.


* `bind(bindingContext: Object, overrideContext: Object): void` - Binds the slot and it&#x27;s children.
  * `bindingContext:Object` - The binding context to bind to.
  * `overrideContext:Object` - A secondary binding context that can override the standard context.



* `detached(): void` - Triggers the detach for the slot and its children.


* `insert(index: number, view: View): ` - Inserts a view into the slot.
  * `index:number` - The index to insert the view at.
  * `view:View` - The view to insert.


* `move(sourceIndex?: any, targetIndex?: any): any` - Moves a view across the slot.
  * `sourceIndex?:any` - The index the view is currently at.
  * `targetIndex?:any` - The index to insert the view at.



* `projectTo(slots: Object): void` - 
  * `slots:Object` - No description available


* `remove(view: View, returnToCache?: boolean, skipAnimation?: boolean): ` - Removes a view from the slot.
  * `view:View` - The view to remove.
  * `returnToCache?:boolean` - Should the view be returned to the view cache?
  * `skipAnimation?:boolean` - Should the removal animation be skipped?


* `removeAll(returnToCache?: boolean, skipAnimation?: boolean): ` - Removes all views from the slot.
  * `returnToCache?:boolean` - Should the view be returned to the view cache?
  * `skipAnimation?:boolean` - Should the removal animation be skipped?


* `removeAt(index: number, returnToCache?: boolean, skipAnimation?: boolean): ` - Removes a view an a specified index from the slot.
  * `index:number` - The index to remove the view at.
  * `returnToCache?:boolean` - Should the view be returned to the view cache?
  * `skipAnimation?:boolean` - Should the removal animation be skipped?


* `removeMany(viewsToRemove: View, returnToCache?: boolean, skipAnimation?: boolean): ` - Removes many views from the slot.
  * `viewsToRemove:View` - The array of views to remove.
  * `returnToCache?:boolean` - Should the views be returned to the view cache?
  * `skipAnimation?:boolean` - Should the removal animation be skipped?


* `transformChildNodesIntoView(): void` - Takes the child nodes of an existing element that has been converted into a ViewSlot
and makes those nodes into a View within the slot.


* `unbind(): void` - Unbinds the slot and its children.



## Interfaces


### ComponentAttached

An optional interface describing the attached convention.

#### Properties


#### Methods


* `attached(): void` - Implement this hook if you want to perform custom logic when the component is attached to the DOM (in document).



### ComponentBind

An optional interface describing the bind convention.

#### Properties


#### Methods


* `bind(bindingContext: any, overrideContext: any): void` - Implement this hook if you want to perform custom logic when databinding is activated on the view and view-model.
The &quot;binding context&quot; to which the component is being bound will be passed first.
An &quot;override context&quot; will be passed second. The override context contains information used to traverse
the parent hierarchy and can also be used to add any contextual properties that the component wants to add.
  * `bindingContext:any` - No description available.
  * `overrideContext:any` - No description available.



### ComponentCreated

An optional interface describing the created convention.

#### Properties


#### Methods


* `created(owningView: View, myView: View): void` - Implement this hook if you want to perform custom logic after the constructor has been called.
At this point in time, the view has also been created and both the view-model and the view
are connected to their controller. The hook will recieve the instance of the &quot;owningView&quot;.
This is the view that the component is declared inside of. If the component itself has a view,
this will be passed second.
  * `owningView:View` - No description available.
  * `myView:View` - No description available.



### ComponentDetached

An optional interface describing the detached convention.

#### Properties


#### Methods


* `detached(): void` - Implement this hook if you want to perform custom logic if/when the component is removed from the the DOM.



### ComponentUnbind

An optional interface describing the unbind convention.

#### Properties


#### Methods


* `unbind(): void` - Implement this hook if you want to perform custom logic after the component is detached and unbound.



### CompositionContext

Instructs the composition engine how to dynamically compose a component.

#### Properties

* `bindingContext:any` - The context in which the view model is executed in.
* `childContainer:Container` - The child Container for the component creation. One will be created from the parent if not provided.
* `container:Container` - The parent Container for the component creation.
* `host:Element` - The element that will parent the dynamic component.
It will be registered in the child container of this composition.
* `model:any` - Data to be passed to the &quot;activate&quot; hook on the view model.
* `overrideContext:any` - A secondary binding context that can override the standard context.
* `owningView:View` - The view inside which this composition is happening.
* `skipActivation:boolean` - Should the composition system skip calling the &quot;activate&quot; hook on the view model.
* `view:` - The view url or view strategy to override the default view location convention.
* `viewModel:any` - The view model url or instance for the component.
* `viewModelResource:HtmlBehaviorResource` - The HtmlBehaviorResource for the component.
* `viewResources:ViewResources` - The view resources for the view in which the component should be created.
* `viewSlot:ViewSlot` - The slot to push the dynamically composed component into.

#### Methods



### DynamicComponentGetViewStrategy

An optional interface describing the getViewStrategy convention for dynamic components (used with the compose element or the router).

#### Properties


#### Methods


* `getViewStrategy(): ` - Implement this hook if you want to provide custom view strategy when this component is used with the compose element or the router.



### EnhanceInstruction

Instructs the framework in how to enhance an existing DOM structure.

#### Properties

* `bindingContext:Object` - A binding context for the enhancement.
* `container:Container` - The DI container to use as the root for UI enhancement.
* `element:Element` - The element to enhance.
* `overrideContext:any` - A secondary binding context that can override the standard context.
* `resources:ViewResources` - The resources available for enhancement.

#### Methods



### EventHandler

No description available.

#### Properties

* `bubbles:boolean` - No description available.
* `dispose:Function` - No description available.
* `eventName:string` - No description available.
* `handler:Function` - No description available.

#### Methods



### ViewCreateInstruction

Specifies how a view should be created.

#### Properties

* `enhance:boolean` - Indicates that the view is being created by enhancing existing DOM.
* `partReplacements:Object` - Specifies a key/value lookup of part replacements for the view being created.

#### Methods



### ViewEngineHooks

View engine hooks that enable a view resource to provide custom processing during the compilation or creation of a view.

#### Properties

* `afterCompile:` - Invoked after a template is compiled.
* `afterCreate:` - Invoked after a view is created.
* `beforeBind:` - Invoked after the bindingContext and overrideContext are configured on the view but before the view is bound.
* `beforeCompile:` - Invoked before a template is compiled.
* `beforeCreate:` - Invoked before a view is created.
* `beforeUnbind:` - Invoked before the view is unbind. The bindingContext and overrideContext are still available on the view.

#### Methods



### ViewNode

Represents a node in the view hierarchy.

#### Properties


#### Methods


* `attached(): void` - Triggers the attach for the node and its children.


* `bind(bindingContext: Object, overrideContext?: Object): void` - Binds the node and it&#x27;s children.
  * `bindingContext:Object` - The binding context to bind to.
  * `overrideContext?:Object` - A secondary binding context that can override the standard context.



* `detached(): void` - Triggers the detach for the node and its children.


* `unbind(): void` - Unbinds the node and its children.



### ViewStrategy

Implemented by classes that describe how a view factory should be loaded.

#### Properties


#### Methods


* `loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext, target?: any): Promise` - Loads a view factory.
  * `viewEngine:ViewEngine` - The view engine to use during the load process.
  * `compileInstruction:ViewCompileInstruction` - Additional instructions to use during compilation of the view.
  * `loadContext?:ResourceLoadContext` - The loading context used for loading all resources and dependencies.
  * `target?:any` - A class from which to extract metadata of additional resources to load.



## Constants

* `SwapStrategies:any` - No description available.
* `animationEvent:any` - List the events that an Animator should raise.
* `viewStrategy:Function` - Decorator: Indicates that the decorated class/object is a view strategy.

## Functions


* `behavior(override: ): any` - Decorator: Specifies a custom HtmlBehaviorResource instance or an object that overrides various implementation details of the default HtmlBehaviorResource.
  * `override:` - The customized HtmlBehaviorResource or an object to override the default with.



* `bindable(nameOrConfigOrTarget?: , key?: any, descriptor?: any): any` - Decorator: Specifies that a property is bindable through HTML.
  * `nameOrConfigOrTarget?:` - The name of the property, or a configuration object.

  * `key?:any` - No description available.
  * `descriptor?:any` - No description available.


* `child(selectorOrConfig: ): any` - Creates a behavior property that references an immediate content child element that matches the provided selector.
  * `selectorOrConfig:` - No description available.


* `children(selectorOrConfig: ): any` - Creates a behavior property that references an array of immediate content child elements that matches the provided selector.
  * `selectorOrConfig:` - No description available.


* `containerless(target?: any): any` - Decorator: Indicates that the custom element should be rendered without its
element container.
  * `target?:any` - No description available.


* `customAttribute(name: string, defaultBindingMode?: number, aliases?: string): any` - Decorator: Indicates that the decorated class is a custom attribute.
  * `name:string` - The name of the custom attribute.
  * `defaultBindingMode?:number` - The default binding mode to use when the attribute is bound with .bind.
  * `aliases?:string` - The array of aliases to associate to the custom attribute.



* `customElement(name: string): any` - Decorator: Indicates that the decorated class is a custom element.
  * `name:string` - The name of the custom element.



* `dynamicOptions(target?: any): any` - Decorator: Specifies that the decorated custom attribute has options that
are dynamic, based on their presence in HTML and not statically known.
  * `target?:any` - No description available.


* `elementConfig(target?: any): any` - Decorator: Indicates that the decorated class provides element configuration
to the EventManager for one or more Web Components.
  * `target?:any` - No description available.


* `inlineView(markup: string, dependencies?: Array, dependencyBaseUrl?: string): any` - Decorator: Provides a view template, directly inline, for the component. Be
sure to wrap the markup in a template element.
  * `markup:string` - The markup for the view.
  * `dependencies?:Array` - A list of dependencies that the template has.
  * `dependencyBaseUrl?:string` - A base url from which the dependencies will be loaded.



* `noView(targetOrDependencies?: , dependencyBaseUrl?: string): any` - Decorator: Indicates that the component has no view.
  * `targetOrDependencies?:` - No description available.
  * `dependencyBaseUrl?:string` - No description available.


* `processAttributes(processor: Function): any` - Decorator: Enables custom processing of the attributes on an element before the framework inspects them.
  * `processor:Function` - Pass a function which can provide custom processing of the content.



* `processContent(processor: ): any` - Decorator: Enables custom processing of the content that is places inside the
custom element by its consumer.
  * `processor:` - Pass a boolean to direct the template compiler to not process
the content placed inside this element. Alternatively, pass a function which
can provide custom processing of the content. This function should then return
a boolean indicating whether the compiler should also process the content.



* `resource(instance: Object): any` - Decorator: Specifies a resource instance that describes the decorated class.
  * `instance:Object` - The resource instance.



* `templateController(target?: any): any` - Decorator: Applied to custom attributes. Indicates that whatever element the
attribute is placed on should be converted into a template and that this
attribute controls the instantiation of the template.
  * `target?:any` - No description available.


* `useShadowDOM(targetOrOptions?: any): any` - Decorator: Indicates that the custom element should render its view in Shadow
DOM. This decorator may change slightly when Aurelia updates to Shadow DOM v1.
  * `targetOrOptions?:any` - No description available.


* `useView(path: string): any` - Decorator: Provides a relative path to a view for the component.
  * `path:string` - The path to the view.



* `useViewStrategy(strategy: Object): any` - Decorator: Associates a custom view strategy with the component.
  * `strategy:Object` - The view strategy instance.



* `viewEngineHooks(target?: any): any` - 
  * `target?:any` - No description available.


* `viewResources(resources: any): any` - Decorator: Provides the ability to add resources to the related View
Same as: &lt;require from&#x3D;&quot;...&quot;&gt;&lt;/require&gt;
  * `resources:any` - Either: strings with moduleIds, Objects with &#x27;src&#x27; and optionally &#x27;as&#x27; properties or one of the classes of the module to be included.


