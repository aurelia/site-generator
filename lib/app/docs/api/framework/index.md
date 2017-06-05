# Framework Module

## Classes


### Aurelia

The framework core that provides the main Aurelia object.

#### Properties

* `container: Container` - The root DI container used by the application.
* `host: Element` - The DOM Element that Aurelia will attach to.
* `loader: Loader` - /**
The loader used by the application.
* `resources: ViewResources` - The global view resources used by the application.
* `use: FrameworkConfiguration` - The configuration used during application startup.

#### Methods


* `enhance(bindingContext?: Object, applicationHost?: ): Promise` - Enhances the host&#x27;s existing elements with behaviors and bindings.
  * `bindingContext?: Object` - A binding context for the enhanced elements.
  * `applicationHost?: ` - The DOM object that Aurelia will enhance.


* `setRoot(root?: string, applicationHost?: ): Promise` - Instantiates the root component and adds it to the DOM.
  * `root?: string` - The root component to load upon bootstrap.
  * `applicationHost?: ` - The DOM object that Aurelia will attach to.


* `start(): Promise` - Loads plugins, then resources, and then starts the Aurelia instance.



### FrameworkConfiguration

Manages configuring the aurelia framework instance.

#### Properties

* `aurelia: Aurelia` - The aurelia instance.
* `container: Container` - The root DI container used by the application.

#### Methods


* `apply(): Promise` - Loads and configures the plugins registered with this instance.


* `basicConfiguration(): FrameworkConfiguration` - Sets up a basic Aurelia configuration. This is equivalent to calling &#x60;.defaultBindingLanguage().defaultResources().eventAggregator();&#x60;


* `defaultBindingLanguage(): FrameworkConfiguration` - Plugs in the default binding language from aurelia-templating-binding.


* `defaultResources(): FrameworkConfiguration` - Plugs in the default templating resources (if, repeat, show, compose, etc.) from aurelia-templating-resources.


* `developmentLogging(): FrameworkConfiguration` - Plugs in the ConsoleAppender and sets the log level to debug.


* `eventAggregator(): FrameworkConfiguration` - Plugs in the event aggregator from aurelia-event-aggregator.


* `feature(plugin: string, config?: any): FrameworkConfiguration` - Configures an internal feature plugin before Aurelia starts.
  * `plugin: string` - The folder for the internal plugin to configure (expects an index.js in that folder).
  * `config?: any` - The configuration for the specified plugin.


* `globalName(resourcePath: string, newName: string): FrameworkConfiguration` - Renames a global resource that was imported.
  * `resourcePath: string` - The path to the resource.
  * `newName: string` - The new name.


* `globalResources(resources: ): FrameworkConfiguration` - Adds globally available view resources to be imported into the Aurelia framework.
  * `resources: ` - The relative module id to the resource. (Relative to the plugin&#x27;s installer.)


* `history(): FrameworkConfiguration` - Plugs in the default history implementation from aurelia-history-browser.


* `instance(type: any, instance: any): FrameworkConfiguration` - Adds an existing object to the framework&#x27;s dependency injection container.
  * `type: any` - The object type of the dependency that the framework will inject.
  * `instance: any` - The existing instance of the dependency that the framework will inject.


* `plugin(plugin: string, config?: any): FrameworkConfiguration` - Configures an external, 3rd party plugin before Aurelia starts.
  * `plugin: string` - The ID of the 3rd party plugin to configure.
  * `config?: any` - The configuration for the specified plugin.


* `postTask(task: Function): FrameworkConfiguration` - Adds an async function that runs after the plugins are run.
  * `task: Function` - The function to run after start.


* `preTask(task: Function): FrameworkConfiguration` - Adds an async function that runs before the plugins are run.
  * `task: Function` - The function to run before start.


* `router(): FrameworkConfiguration` - Plugs in the router from aurelia-templating-router.


* `singleton(type: any, implementation?: Function): FrameworkConfiguration` - Adds a singleton to the framework&#x27;s dependency injection container.
  * `type: any` - The object type of the dependency that the framework will inject.
  * `implementation?: Function` - The constructor function of the dependency that the framework will inject.


* `standardConfiguration(): FrameworkConfiguration` - Sets up the standard Aurelia configuration. This is equivalent to calling &#x60;.defaultBindingLanguage().defaultResources().eventAggregator().history().router();&#x60;


* `transient(type: any, implementation?: Function): FrameworkConfiguration` - Adds a transient to the framework&#x27;s dependency injection container.
  * `type: any` - The object type of the dependency that the framework will inject.
  * `implementation?: Function` - The constructor function of the dependency that the framework will inject.



## Interfaces


## Constants

* `LogManager: any` - The log manager.

## Functions

