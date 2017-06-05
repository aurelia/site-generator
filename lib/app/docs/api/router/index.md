# Router Module

> A powerful client-side router.

## Classes


### ActivateNextStep

No description available.

#### Properties


#### Methods


* `run(navigationInstruction: NavigationInstruction, next: Function): any` - 
  * `navigationInstruction: NavigationInstruction` - No description available
  * `next: Function` - No description available



### AppRouter

The main application router.

#### Properties

* `baseUrl: string` - The [[Router]]&#x27;s current base URL, typically based on the [[Router.currentInstruction]].
* `container: Container` - No description available.
* `currentInstruction: NavigationInstruction` - The currently active navigation instruction.
* `history: History` - No description available.
* `isConfigured: boolean` - True if the [[Router]] has been configured.
* `isExplicitNavigation: boolean` - True if the [[Router]] is navigating due to explicit call to navigate function(s).
* `isExplicitNavigationBack: boolean` - True if the [[Router]] is navigating due to explicit call to navigateBack function.
* `isNavigating: boolean` - True if the [[Router]] is currently processing a navigation.
* `isRoot: boolean` - Gets a value indicating whether or not this [[Router]] is the root in the router tree. I.e., it has no parent.
* `navigation: NavModel` - The navigation models for routes that specified [[RouteConfig.nav]].
* `options: any` - No description available.
* `parent: Router` - The parent router, or null if this instance is not a child router.
* `routes: RouteConfig` - No description available.
* `transformTitle: ` - Extension point to transform the document title before it is built and displayed.
By default, child routers delegate to the parent router, and the app router
returns the title unchanged.
* `viewPorts: Object` - No description available.

#### Methods


* `activate(options: Object): void` - Activates the router. This instructs the router to begin listening for history changes and processing instructions.
  * `options: Object` - No description available


* `addRoute(config: RouteConfig, navModel?: NavModel): void` - Registers a new route with the router.
  * `config: RouteConfig` - The [[RouteConfig]].
  * `navModel?: NavModel` - The [[NavModel]] to use for the route. May be omitted for single-pattern routes.



* `configure(callbackOrConfig: ): Promise` - Configures the router.
  * `callbackOrConfig: ` - The [[RouterConfiguration]] or a callback that takes a [[RouterConfiguration]].



* `createChild(container?: Container): Router` - Creates a child router of the current router.
  * `container?: Container` - The [[Container]] to provide to the child router. Uses the current [[Router]]&#x27;s [[Container]] if unspecified.


* `createNavModel(config: RouteConfig): NavModel` - Creates a [[NavModel]] for the specified route config.
  * `config: RouteConfig` - The route config.



* `deactivate(): void` - Deactivates the router.


* `ensureConfigured(): Promise` - Returns a Promise that resolves when the router is configured.


* `generate(name: string, params?: any, options?: any): string` - Generates a URL fragment matching the specified route pattern.
  * `name: string` - The name of the route whose pattern should be used to generate the fragment.
  * `params?: any` - The route params to be used to populate the route pattern.
  * `options?: any` - No description available


* `handleUnknownRoutes(config?: ): void` - Register a handler to use when the incoming URL fragment doesn&#x27;t match any registered routes.
  * `config?: ` - The moduleId, or a function that selects the moduleId, or a [[RouteConfig]].



* `hasOwnRoute(name: string): boolean` - Gets a value indicating whether or not this [[Router]] has a route registered with the specified name.
  * `name: string` - The name of the route to check.



* `hasRoute(name: string): boolean` - Gets a value indicating whether or not this [[Router]] or one of its ancestors has a route registered with the specified name.
  * `name: string` - The name of the route to check.



* `loadUrl(url?: any): Promise` - Loads the specified URL.
  * `url?: any` - The URL fragment to load.



* `navigate(fragment: string, options?: any): boolean` - Navigates to a new location.
  * `fragment: string` - The URL fragment to use as the navigation destination.
  * `options?: any` - The navigation options.



* `navigateBack(): void` - Navigates back to the most recent location in history.


* `navigateToRoute(route: string, params?: any, options?: any): boolean` - Navigates to a new location corresponding to the route and params specified. Equivallent to [[Router.generate]] followed
by [[Router.navigate]].
  * `route: string` - The name of the route to use when generating the navigation location.
  * `params?: any` - The route parameters to be used when populating the route pattern.
  * `options?: any` - The navigation options.



* `refreshNavigation(): void` - Updates the navigation routes with hrefs relative to the current location.
Note: This method will likely move to a plugin in a future release.


* `registerViewPort(viewPort: any, name: string): Promise` - Registers a viewPort to be used as a rendering target for activated routes.
  * `viewPort: any` - The viewPort.
  * `name: string` - The name of the viewPort. &#x27;default&#x27; if unspecified.



* `reset(): any` - Fully resets the router&#x27;s internal state. Primarily used internally by the framework when multiple calls to setRoot are made.
Use with caution (actually, avoid using this). Do not use this to simply change your navigation model.


* `updateTitle(): void` - Updates the document title using the current navigation instruction.


* `static inject(): any` - 



### BuildNavigationPlanStep

No description available.

#### Properties


#### Methods


* `run(navigationInstruction: NavigationInstruction, next: Function): any` - 
  * `navigationInstruction: NavigationInstruction` - No description available
  * `next: Function` - No description available



### CanActivateNextStep

No description available.

#### Properties


#### Methods


* `run(navigationInstruction: NavigationInstruction, next: Function): any` - 
  * `navigationInstruction: NavigationInstruction` - No description available
  * `next: Function` - No description available



### CanDeactivatePreviousStep

No description available.

#### Properties


#### Methods


* `run(navigationInstruction: NavigationInstruction, next: Function): any` - 
  * `navigationInstruction: NavigationInstruction` - No description available
  * `next: Function` - No description available



### CommitChangesStep

No description available.

#### Properties


#### Methods


* `run(navigationInstruction: NavigationInstruction, next: Function): any` - 
  * `navigationInstruction: NavigationInstruction` - No description available
  * `next: Function` - No description available



### DeactivatePreviousStep

No description available.

#### Properties


#### Methods


* `run(navigationInstruction: NavigationInstruction, next: Function): any` - 
  * `navigationInstruction: NavigationInstruction` - No description available
  * `next: Function` - No description available



### LoadRouteStep

No description available.

#### Properties


#### Methods


* `run(navigationInstruction: NavigationInstruction, next: Function): any` - 
  * `navigationInstruction: NavigationInstruction` - No description available
  * `next: Function` - No description available


* `static inject(): any` - 



### NavModel

Class for storing and interacting with a route&#x27;s navigation settings.

#### Properties

* `config: RouteConfig` - The route config.
* `href: string` - This nav item&#x27;s absolute href.
* `isActive: boolean` - True if this nav item is currently active.
* `relativeHref: string` - This nav item&#x27;s relative href.
* `router: Router` - The router associated with this navitation model.
* `settings: any` - Data attached to the route at configuration time.
* `title: string` - The title.

#### Methods


* `setTitle(title: string): void` - Sets the route&#x27;s title and updates document.title.
 If the a navigation is in progress, the change will be applied
 to document.title when the navigation completes.
  * `title: string` - The new title.




### NavigationInstruction

Class used to represent an instruction during a navigation.

#### Properties

* `config: RouteConfig` - The route config for the route matching this instruction.
* `fragment: string` - The URL fragment.
* `options: Object` - No description available.
* `params: any` - Parameters extracted from the route pattern.
* `parentInstruction: NavigationInstruction` - The parent instruction, if this instruction was created by a child router.
* `plan: Object` - No description available.
* `previousInstruction: NavigationInstruction` - The instruction being replaced by this instruction in the current router.
* `queryParams: any` - Parameters extracted from the query string.
* `queryString: string` - The query string.
* `router: Router` - The router instance.
* `viewPortInstructions: any` - viewPort instructions to used activation.

#### Methods


* `addViewPortInstruction(viewPortName: string, strategy: string, moduleId: string, component: any): any` - Adds a viewPort instruction.
  * `viewPortName: string` - No description available
  * `strategy: string` - No description available
  * `moduleId: string` - No description available
  * `component: any` - No description available


* `getAllInstructions(): Array` - Gets an array containing this instruction and all child instructions for the current navigation.


* `getAllPreviousInstructions(): Array` - Gets an array containing the instruction and all child instructions for the previous navigation.
Previous instructions are no longer available after navigation completes.


* `getBaseUrl(): string` - Gets the instruction&#x27;s base URL, accounting for wildcard route parameters.


* `getWildCardName(): string` - Gets the name of the route pattern&#x27;s wildcard parameter, if applicable.


* `getWildcardPath(): string` - Gets the path and query string created by filling the route
pattern&#x27;s wildcard parameter with the matching param.



### Pipeline

The class responsible for managing and processing the navigation pipeline.

#### Properties

* `steps: Array` - The pipeline steps.

#### Methods


* `addStep(step: PipelineStep): Pipeline` - Adds a step to the pipeline.
  * `step: PipelineStep` - The pipeline step.



* `run(instruction: NavigationInstruction): Promise` - Runs the pipeline.
  * `instruction: NavigationInstruction` - The navigation instruction to process.




### PipelineProvider

Class responsible for creating the navigation pipeline.

#### Properties


#### Methods


* `addStep(name: string, step: PipelineStep): void` - Adds a step into the pipeline at a known slot location.
  * `name: string` - No description available
  * `step: PipelineStep` - No description available


* `createPipeline(): Pipeline` - Create the navigation pipeline.


* `removeStep(name: string, step: PipelineStep): any` - Removes a step from a slot in the pipeline
  * `name: string` - No description available
  * `step: PipelineStep` - No description available


* `reset(): any` - Resets all pipeline slots


* `static inject(): any` - 



### Redirect

Used during the activation lifecycle to cause a redirect.

#### Properties


#### Methods


* `navigate(appRouter: Router): void` - Called by the navigation pipeline to navigate.
  * `appRouter: Router` - The router to be redirected.



* `setRouter(router: Router): void` - Called by the activation system to set the child router.
  * `router: Router` - The router.




### RedirectToRoute

Used during the activation lifecycle to cause a redirect to a named route.

#### Properties


#### Methods


* `navigate(appRouter: Router): void` - Called by the navigation pipeline to navigate.
  * `appRouter: Router` - The router to be redirected.



* `setRouter(router: Router): void` - Called by the activation system to set the child router.
  * `router: Router` - The router.




### RouteLoader

No description available.

#### Properties


#### Methods


* `loadRoute(router: any, config: any, navigationInstruction: any): any` - 
  * `router: any` - No description available
  * `config: any` - No description available
  * `navigationInstruction: any` - No description available



### Router

The primary class responsible for handling routing and navigation.

#### Properties

* `baseUrl: string` - The [[Router]]&#x27;s current base URL, typically based on the [[Router.currentInstruction]].
* `container: Container` - No description available.
* `currentInstruction: NavigationInstruction` - The currently active navigation instruction.
* `history: History` - No description available.
* `isConfigured: boolean` - True if the [[Router]] has been configured.
* `isExplicitNavigation: boolean` - True if the [[Router]] is navigating due to explicit call to navigate function(s).
* `isExplicitNavigationBack: boolean` - True if the [[Router]] is navigating due to explicit call to navigateBack function.
* `isNavigating: boolean` - True if the [[Router]] is currently processing a navigation.
* `isRoot: boolean` - Gets a value indicating whether or not this [[Router]] is the root in the router tree. I.e., it has no parent.
* `navigation: NavModel` - The navigation models for routes that specified [[RouteConfig.nav]].
* `options: any` - No description available.
* `parent: Router` - The parent router, or null if this instance is not a child router.
* `routes: RouteConfig` - No description available.
* `transformTitle: ` - Extension point to transform the document title before it is built and displayed.
By default, child routers delegate to the parent router, and the app router
returns the title unchanged.
* `viewPorts: Object` - No description available.

#### Methods


* `addRoute(config: RouteConfig, navModel?: NavModel): void` - Registers a new route with the router.
  * `config: RouteConfig` - The [[RouteConfig]].
  * `navModel?: NavModel` - The [[NavModel]] to use for the route. May be omitted for single-pattern routes.



* `configure(callbackOrConfig: ): Promise` - Configures the router.
  * `callbackOrConfig: ` - The [[RouterConfiguration]] or a callback that takes a [[RouterConfiguration]].



* `createChild(container?: Container): Router` - Creates a child router of the current router.
  * `container?: Container` - The [[Container]] to provide to the child router. Uses the current [[Router]]&#x27;s [[Container]] if unspecified.


* `createNavModel(config: RouteConfig): NavModel` - Creates a [[NavModel]] for the specified route config.
  * `config: RouteConfig` - The route config.



* `ensureConfigured(): Promise` - Returns a Promise that resolves when the router is configured.


* `generate(name: string, params?: any, options?: any): string` - Generates a URL fragment matching the specified route pattern.
  * `name: string` - The name of the route whose pattern should be used to generate the fragment.
  * `params?: any` - The route params to be used to populate the route pattern.
  * `options?: any` - No description available


* `handleUnknownRoutes(config?: ): void` - Register a handler to use when the incoming URL fragment doesn&#x27;t match any registered routes.
  * `config?: ` - The moduleId, or a function that selects the moduleId, or a [[RouteConfig]].



* `hasOwnRoute(name: string): boolean` - Gets a value indicating whether or not this [[Router]] has a route registered with the specified name.
  * `name: string` - The name of the route to check.



* `hasRoute(name: string): boolean` - Gets a value indicating whether or not this [[Router]] or one of its ancestors has a route registered with the specified name.
  * `name: string` - The name of the route to check.



* `navigate(fragment: string, options?: any): boolean` - Navigates to a new location.
  * `fragment: string` - The URL fragment to use as the navigation destination.
  * `options?: any` - The navigation options.



* `navigateBack(): void` - Navigates back to the most recent location in history.


* `navigateToRoute(route: string, params?: any, options?: any): boolean` - Navigates to a new location corresponding to the route and params specified. Equivallent to [[Router.generate]] followed
by [[Router.navigate]].
  * `route: string` - The name of the route to use when generating the navigation location.
  * `params?: any` - The route parameters to be used when populating the route pattern.
  * `options?: any` - The navigation options.



* `refreshNavigation(): void` - Updates the navigation routes with hrefs relative to the current location.
Note: This method will likely move to a plugin in a future release.


* `registerViewPort(viewPort: any, name?: string): void` - Registers a viewPort to be used as a rendering target for activated routes.
  * `viewPort: any` - The viewPort.
  * `name?: string` - The name of the viewPort. &#x27;default&#x27; if unspecified.



* `reset(): any` - Fully resets the router&#x27;s internal state. Primarily used internally by the framework when multiple calls to setRoot are made.
Use with caution (actually, avoid using this). Do not use this to simply change your navigation model.


* `updateTitle(): void` - Updates the document title using the current navigation instruction.



### RouterConfiguration

Class used to configure a [[Router]] instance.

#### Properties

* `instructions: any` - No description available.
* `options: any` - No description available.
* `pipelineSteps: Array` - No description available.
* `title: string` - No description available.
* `unknownRouteConfig: any` - No description available.

#### Methods


* `addAuthorizeStep(step: ): RouterConfiguration` - Adds a step to be run during the [[Router]]&#x27;s authorize pipeline slot.
  * `step: ` - The pipeline step.


* `addPipelineStep(name: string, step: ): RouterConfiguration` - Adds a step to be run during the [[Router]]&#x27;s navigation pipeline.
  * `name: string` - The name of the pipeline slot to insert the step into.
  * `step: ` - The pipeline step.


* `addPostRenderStep(step: ): RouterConfiguration` - Adds a step to be run during the [[Router]]&#x27;s postRender pipeline slot.
  * `step: ` - The pipeline step.


* `addPreActivateStep(step: ): RouterConfiguration` - Adds a step to be run during the [[Router]]&#x27;s preActivate pipeline slot.
  * `step: ` - The pipeline step.


* `addPreRenderStep(step: ): RouterConfiguration` - Adds a step to be run during the [[Router]]&#x27;s preRender pipeline slot.
  * `step: ` - The pipeline step.


* `exportToRouter(router: Router): void` - Applies the current configuration to the specified [[Router]].
  * `router: Router` - The [[Router]] to apply the configuration to.



* `fallbackRoute(fragment: string): RouterConfiguration` - Configures a route that will be used if there is no previous location available on navigation cancellation.
  * `fragment: string` - The URL fragment to use as the navigation destination.


* `map(route: ): RouterConfiguration` - Maps one or more routes to be registered with the router.
  * `route: ` - The [[RouteConfig]] to map, or an array of [[RouteConfig]] to map.


* `mapRoute(config: RouteConfig): RouterConfiguration` - Maps a single route to be registered with the router.
  * `config: RouteConfig` - No description available


* `mapUnknownRoutes(config: ): RouterConfiguration` - Registers an unknown route handler to be run when the URL fragment doesn&#x27;t match any registered routes.
  * `config: ` - A string containing a moduleId to load, or a [[RouteConfig]], or a function that takes the
 [[NavigationInstruction]] and selects a moduleId to load.



## Interfaces


### ConfiguresRouter

An optional interface describing the router configuration convention.

#### Properties


#### Methods


* `configureRouter(config: RouterConfiguration, router: Router): ` - Implement this hook if you want to configure a router.
  * `config: RouterConfiguration` - No description available.
  * `router: Router` - No description available.



### IObservable

A basic interface for an Observable type

#### Properties


#### Methods


* `subscribe(): ISubscription` - 



### ISubscription

A basic interface for a Subscription to an Observable

#### Properties


#### Methods


* `unsubscribe(): void` - 



### NavigationCommand

When a navigation command is encountered, the current navigation
will be cancelled and control will be passed to the navigation
command so it can determine the correct action.

#### Properties


#### Methods


* `navigate(router: Router): void` - 
  * `router: Router` - No description available.



### NavigationInstructionInit

No description available.

#### Properties

* `config: RouteConfig` - No description available.
* `fragment: string` - No description available.
* `options: Object` - No description available.
* `params: Object` - No description available.
* `parentInstruction: NavigationInstruction` - No description available.
* `previousInstruction: NavigationInstruction` - No description available.
* `queryParams: Object` - No description available.
* `queryString: string` - No description available.
* `router: Router` - No description available.

#### Methods



### Next

A callback to indicate when pipeline processing should advance to the next step
or be aborted.

#### Properties


#### Methods


* `cancel(result?: any): Promise` - Indicates that the pipeline should cancel processing.
  * `result?: any` - No description available.


* `complete(result?: any): Promise` - Indicates the successful completion of the entire pipeline.
  * `result?: any` - No description available.


* `reject(result?: any): Promise` - Indicates that pipeline processing has failed and should be stopped.
  * `result?: any` - No description available.



### PipelineResult

The result of a pipeline run.

#### Properties

* `completed: boolean` - No description available.
* `instruction: NavigationInstruction` - No description available.
* `output: any` - No description available.
* `status: string` - No description available.

#### Methods



### PipelineStep

A step to be run during processing of the pipeline.

#### Properties


#### Methods


* `run(instruction: NavigationInstruction, next: Next): Promise` - Execute the pipeline step. The step should invoke next(), next.complete(),
next.cancel(), or next.reject() to allow the pipeline to continue.
  * `instruction: NavigationInstruction` - The navigation instruction.
  * `next: Next` - The next step in the pipeline.




### RoutableComponentActivate

An optional interface describing the activate convention.

#### Properties


#### Methods


* `activate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): ` - Implement this hook if you want to perform custom logic just before your view-model is displayed.
You can optionally return a promise to tell the router to wait to bind and attach the view until
after you finish your work.
  * `params: any` - No description available.
  * `routeConfig: RouteConfig` - No description available.
  * `navigationInstruction: NavigationInstruction` - No description available.



### RoutableComponentCanActivate

An optional interface describing the canActivate convention.

#### Properties


#### Methods


* `canActivate(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): ` - Implement this hook if you want to control whether or not your view-model can be navigated to.
Return a boolean value, a promise for a boolean value, or a navigation command.
  * `params: any` - No description available.
  * `routeConfig: RouteConfig` - No description available.
  * `navigationInstruction: NavigationInstruction` - No description available.



### RoutableComponentCanDeactivate

An optional interface describing the canDeactivate convention.

#### Properties


#### Methods


* `canDeactivate(): ` - Implement this hook if you want to control whether or not the router can navigate away from your
view-model when moving to a new route. Return a boolean value, a promise for a boolean value,
or a navigation command.



### RoutableComponentDeactivate

An optional interface describing the deactivate convention.

#### Properties


#### Methods


* `deactivate(): ` - Implement this hook if you want to perform custom logic when your view-model is being
navigated away from. You can optionally return a promise to tell the router to wait until
after you finish your work.



### RoutableComponentDetermineActivationStrategy

An optional interface describing the determineActivationStrategy convention.

#### Properties


#### Methods


* `determineActivationStrategy(params: any, routeConfig: RouteConfig, navigationInstruction: NavigationInstruction): string` - Implement this hook if you want to give hints to the router about the activation strategy, when reusing
a view model for different routes. Available values are &#x27;replace&#x27; and &#x27;invoke-lifecycle&#x27;.
  * `params: any` - No description available.
  * `routeConfig: RouteConfig` - No description available.
  * `navigationInstruction: NavigationInstruction` - No description available.



### RouteConfig

A configuration object that describes a route.

#### Properties

* `activationStrategy: string` - Add to specify an activation strategy if it is always the same and you do not want that
to be in your view-model code. Available values are &#x27;replace&#x27; and &#x27;invoke-lifecycle&#x27;.
* `caseSensitive: boolean` - When true is specified, this route will be case sensitive.
* `generationUsesHref: boolean` - Indicates that when route generation is done for this route, it should just take the literal value of the href property.
* `href: string` - The URL fragment to use in nav models. If unspecified, the [[RouteConfig.route]] will be used.
However, if the [[RouteConfig.route]] contains dynamic segments, this property must be specified.
* `layoutModel: string` - specifies the model parameter to pass to the layout view model&#x27;s &#x60;activate&#x60; function.
* `layoutView: string` - specifies the file name of a layout view to use.
* `layoutViewModel: string` - specifies the moduleId of the view model to use with the layout view.
* `moduleId: string` - The moduleId of the view model that should be activated for this route.
* `name: string` - A unique name for the route that may be used to identify the route when generating URL fragments.
Required when this route should support URL generation, such as with [[Router.generate]] or
the route-href custom attribute.
* `nav: ` - When specified, this route will be included in the [[Router.navigation]] nav model. Useful for
dynamically generating menus or other navigation elements. When a number is specified, that value
will be used as a sort order.
* `navModel: NavModel` - The navigation model for storing and interacting with the route&#x27;s navigation settings.
* `navigationStrategy: ` - A function that can be used to dynamically select the module or modules to activate.
The function is passed the current [[NavigationInstruction]], and should configure
instruction.config with the desired moduleId, viewPorts, or redirect.
* `redirect: string` - A URL fragment to redirect to when this route is matched.
* `route: ` - The route pattern to match against incoming URL fragments, or an array of patterns.
* `settings: any` - Arbitrary data to attach to the route. This can be used to attached custom data needed by components
like pipeline steps and activated modules.
* `title: string` - The document title to set when this route is active.
* `viewPorts: any` - The view ports to target when activating this route. If unspecified, the target moduleId is loaded
into the default viewPort (the viewPort with name &#x27;default&#x27;). The viewPorts object should have keys
whose property names correspond to names used by &lt;router-view&gt; elements. The values should be objects
specifying the moduleId to load into that viewPort.  The values may optionally include properties related to layout:
&#x60;layoutView&#x60;, &#x60;layoutViewModel&#x60; and &#x60;layoutModel&#x60;.

#### Methods



## Constants

* `activationStrategy: any` - The strategy to use when activating modules during navigation.
* `pipelineStatus: any` - The status of a Pipeline.

## Functions


* `isNavigationCommand(obj: any): boolean` - Determines if the provided object is a navigation command.
A navigation command is anything with a navigate method.
  * `obj: any` - The object to check.


