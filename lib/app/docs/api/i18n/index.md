# I18N API

## Classes


### Backend

No description available.

#### Properties

* `loader:any` - No description available.

#### Methods


* `create(languages?: any, namespace?: any, key?: any, fallbackValue?: any): any` - 
  * `languages?:any` - No description available
  * `namespace?:any` - No description available
  * `key?:any` - No description available
  * `fallbackValue?:any` - No description available


* `init(services?: any, options?: any): any` - 
  * `services?:any` - No description available
  * `options?:any` - No description available


* `loadUrl(url?: any, callback?: any): any` - 
  * `url?:any` - No description available
  * `callback?:any` - No description available


* `read(language?: any, namespace?: any, callback?: any): any` - 
  * `language?:any` - No description available
  * `namespace?:any` - No description available
  * `callback?:any` - No description available


* `readMulti(languages?: any, namespaces?: any, callback?: any): any` - 
  * `languages?:any` - No description available
  * `namespaces?:any` - No description available
  * `callback?:any` - No description available


* `with(loader?: any): any` - 
  * `loader?:any` - No description available



### BaseI18N

No description available.

#### Properties

* `inject:any` - No description available.

#### Methods


* `attached(): any` - 


* `detached(): any` - 



### DfBindingBehavior

No description available.

#### Properties


#### Methods


* `bind(binding?: any, source?: any): any` - 
  * `binding?:any` - No description available
  * `source?:any` - No description available


* `unbind(binding?: any, source?: any): any` - 
  * `binding?:any` - No description available
  * `source?:any` - No description available


* `inject(): any` - 



### DfValueConverter

No description available.

#### Properties


#### Methods


* `toView(value?: any, dfOrOptions?: any, locale?: any, df?: any): any` - 
  * `value?:any` - No description available
  * `dfOrOptions?:any` - No description available
  * `locale?:any` - No description available
  * `df?:any` - No description available


* `inject(): any` - 



### I18N

No description available.

#### Properties

* `ea:EventAggregator` - No description available.
* `globalVars:any` - No description available.
* `i18next:any` - No description available.
* `i18nextDefered:any` - No description available.
* `params:any` - No description available.
* `inject:any` - No description available.

#### Methods


* `df(options?: any, locales?: any): any` - 
  * `options?:any` - No description available
  * `locales?:any` - No description available


* `getLocale(): string` - 


* `i18nextReady(): Promise` - 


* `nf(options?: any, locales?: any): any` - 
  * `options?:any` - No description available
  * `locales?:any` - No description available


* `registerGlobalVariable(key?: any, value?: any): void` - 
  * `key?:any` - No description available
  * `value?:any` - No description available


* `setLocale(locale?: any): Promise` - 
  * `locale?:any` - No description available


* `setup(options?: any): Promise` - 
  * `options?:any` - No description available


* `tr(key?: any, options?: any): string` - 
  * `key?:any` - No description available
  * `options?:any` - No description available


* `uf(number?: any, locale?: any): number` - 
  * `number?:any` - No description available
  * `locale?:any` - No description available


* `unregisterGlobalVariable(key?: any): void` - 
  * `key?:any` - No description available


* `updateTranslations(el?: any): void` - Scans an element for children that have a translation attribute and
updates their innerHTML with the current translation values.
  * `el?:any` - HTMLElement to search within



* `updateValue(node?: any, value?: any, params?: any): any` - 
  * `node?:any` - No description available
  * `value?:any` - No description available
  * `params?:any` - No description available



### LazyOptional

No description available.

#### Properties


#### Methods


* `get(container?: any): any` - 
  * `container?:any` - No description available


* `of(key?: any): any` - 
  * `key?:any` - No description available



### NfBindingBehavior

No description available.

#### Properties


#### Methods


* `bind(binding?: any, source?: any): any` - 
  * `binding?:any` - No description available
  * `source?:any` - No description available


* `unbind(binding?: any, source?: any): any` - 
  * `binding?:any` - No description available
  * `source?:any` - No description available


* `inject(): any` - 



### NfValueConverter

No description available.

#### Properties


#### Methods


* `toView(value?: any, nfOrOptions?: any, locale?: any, nf?: any): any` - 
  * `value?:any` - No description available
  * `nfOrOptions?:any` - No description available
  * `locale?:any` - No description available
  * `nf?:any` - No description available


* `inject(): any` - 



### RelativeTime

No description available.

#### Properties


#### Methods


* `addTranslationResource(key?: any, translation?: any): any` - 
  * `key?:any` - No description available
  * `translation?:any` - No description available


* `getRelativeTime(time?: any): any` - 
  * `time?:any` - No description available


* `getTimeDiffDescription(diff?: any, unit?: any, timeDivisor?: any): any` - 
  * `diff?:any` - No description available
  * `unit?:any` - No description available
  * `timeDivisor?:any` - No description available


* `setup(locales?: any): any` - 
  * `locales?:any` - No description available


* `inject(): any` - 



### RtValueConverter

No description available.

#### Properties


#### Methods


* `toView(value?: any): any` - 
  * `value?:any` - No description available


* `inject(): any` - 



### TBindingBehavior

No description available.

#### Properties

* `inject:any` - No description available.

#### Methods


* `bind(binding?: any, source?: any): any` - 
  * `binding?:any` - No description available
  * `source?:any` - No description available


* `unbind(binding?: any, source?: any): any` - 
  * `binding?:any` - No description available
  * `source?:any` - No description available



### TCustomAttribute

No description available.

#### Properties

* `inject:any` - No description available.

#### Methods


* `bind(): any` - 


* `paramsChanged(newValue?: any, newParams?: any): any` - 
  * `newValue?:any` - No description available
  * `newParams?:any` - No description available


* `unbind(): any` - 


* `valueChanged(newValue?: any): any` - 
  * `newValue?:any` - No description available


* `configureAliases(aliases?: any): any` - 
  * `aliases?:any` - No description available



### TParamsCustomAttribute

No description available.

#### Properties

* `service:any` - No description available.
* `inject:any` - No description available.

#### Methods


* `valueChanged(): any` - 


* `configureAliases(aliases?: any): any` - 
  * `aliases?:any` - No description available



### TValueConverter

No description available.

#### Properties


#### Methods


* `toView(value?: any, options?: any): any` - 
  * `value?:any` - No description available
  * `options?:any` - No description available


* `inject(): any` - 



## Interfaces


## Variables

* `assignObjectToKeys:any` - No description available.
* `extend:any` - No description available.
* `translations:any` - No description available.

## Functions

