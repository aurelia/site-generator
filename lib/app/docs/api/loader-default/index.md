# Loader-Default API

## Classes


### DefaultLoader

A default implementation of the Loader abstraction which works with SystemJS, RequireJS and Dojo Loader.

#### Properties

* `textPluginName:string` - The name of the underlying native loader plugin used to load text.

#### Methods


* `addPlugin(pluginName: string, implementation: LoaderPlugin): void` - Registers a plugin with the loader.
  * `pluginName:string` - The name of the plugin.
  * `implementation:LoaderPlugin` - The plugin implementation.



* `applyPluginToUrl(url: string, pluginName: string): string` - Alters a module id so that it includes a plugin loader.
  * `url:string` - The url of the module to load.
  * `pluginName:string` - The plugin to apply to the module id.


* `getOrCreateTemplateRegistryEntry(address: string): TemplateRegistryEntry` - Gets or creates a TemplateRegistryEntry for the provided address.
  * `address:string` - The address of the template.


* `loadAllModules(ids: string): Promise` - Loads a collection of modules.
  * `ids:string` - The set of module ids to load.


* `loadModule(id: string): Promise` - Loads a module.
  * `id:string` - The module id to normalize.


* `loadTemplate(url: string): Promise` - Loads a template.
  * `url:string` - The url of the template to load.


* `loadText(url: string): Promise` - Loads a text-based resource.
  * `url:string` - The url of the text file to load.


* `map(id: string, source: string): void` - Maps a module id to a source.
  * `id:string` - The module id.
  * `source:string` - The source to map the module to.



* `normalize(moduleId: string, relativeTo: string): Promise` - Normalizes a module id.
  * `moduleId:string` - The module id to normalize.
  * `relativeTo:string` - What the module id should be normalized relative to.


* `normalizeSync(moduleId: string, relativeTo: string): string` - Normalizes a module id.
  * `moduleId:string` - The module id to normalize.
  * `relativeTo:string` - What the module id should be normalized relative to.


* `useTemplateLoader(templateLoader: TemplateLoader): void` - Instructs the loader to use a specific TemplateLoader instance for loading templates
  * `templateLoader:TemplateLoader` - The instance of TemplateLoader to use for loading templates.




### TextTemplateLoader

An implementation of the TemplateLoader interface implemented with text-based loading.

#### Properties


#### Methods


* `loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise` - Loads a template.
  * `loader:Loader` - The loader that is requesting the template load.
  * `entry:TemplateRegistryEntry` - The TemplateRegistryEntry to load and populate with a template.



## Interfaces


### TemplateLoader

Represents a template loader.

#### Properties


#### Methods


* `loadTemplate(loader: Loader, entry: TemplateRegistryEntry): Promise` - Loads a template.
  * `loader:Loader` - The loader that is requesting the template load.
  * `entry:TemplateRegistryEntry` - The TemplateRegistryEntry to load and populate with a template.



## Variables


## Functions

