# Loader Module

> An abstract module which specifies an interface for loading modules and view templates.

## Classes


### Loader

A generic resource loader, for loading modules, html, css and more.

#### Properties


#### Methods


* `addPlugin(pluginName: string, implementation: LoaderPlugin): void` - Registers a plugin with the loader.
  * `pluginName: string` - The name of the plugin.
  * `implementation: LoaderPlugin` - The plugin implementation.



* `applyPluginToUrl(url: string, pluginName: string): string` - Alters a module id so that it includes a plugin loader.
  * `url: string` - The url of the module to load.
  * `pluginName: string` - The plugin to apply to the module id.


* `getOrCreateTemplateRegistryEntry(address: string): TemplateRegistryEntry` - Gets or creates a TemplateRegistryEntry for the provided address.
  * `address: string` - The address of the template.


* `loadAllModules(ids: ): Promise` - Loads a collection of modules.
  * `ids: ` - The set of module ids to load.


* `loadModule(id: string): Promise` - Loads a module.
  * `id: string` - The module id to normalize.


* `loadTemplate(url: string): Promise` - Loads a template.
  * `url: string` - The url of the template to load.


* `loadText(url: string): Promise` - Loads a text-based resource.
  * `url: string` - The url of the text file to load.


* `map(id: string, source: string): void` - Maps a module id to a source.
  * `id: string` - The module id.
  * `source: string` - The source to map the module to.



* `normalize(moduleId: string, relativeTo: string): Promise` - Normalizes a module id.
  * `moduleId: string` - The module id to normalize.
  * `relativeTo: string` - What the module id should be normalized relative to.


* `normalizeSync(moduleId: string, relativeTo: string): string` - Normalizes a module id.
  * `moduleId: string` - The module id to normalize.
  * `relativeTo: string` - What the module id should be normalized relative to.



### TemplateDependency

Represents a dependency of a template.

#### Properties

* `name: string` - The local name of the src when used in the template.
* `src: string` - The source of the dependency.

#### Methods



### TemplateRegistryEntry

Represents an entry in the template registry.

#### Properties

* `address: string` - The address of the template that this entry represents.
* `dependencies: ` - The dependencies of the associated template. Dependencies are not available until after the template is loaded.
* `factory: any` - Gets the factory capable of creating instances of this template.
* `factoryIsReady: boolean` - Indicates whether the factory is ready to be used to create instances of the associated template.
* `resources: Object` - Sets the resources associated with this entry.
* `template: Element` - Gets the template for this registry entry.
* `templateIsLoaded: boolean` - Indicates whether or not the associated template is loaded .

#### Methods


* `addDependency(src: , name?: string): void` - Adds a dependency to this template registry entry. Cannot be called until after the template is set.
  * `src: ` - The dependency instance or a relative path to its module.
  * `name?: string` - An optional local name by which this dependency is used in the template.




## Interfaces


### LoaderPlugin

Represents a plugin to the module loader.

#### Properties


#### Methods


* `fetch(address: string): Promise` - Fetches the resource.
  * `address: string` - The address of the resource.



## Constants


## Functions

