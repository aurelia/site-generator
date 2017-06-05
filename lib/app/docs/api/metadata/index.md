# Metadata Module

> Utilities for reading and writing the metadata of JavaScript functions.

## Classes


### Origin

A metadata annotation that describes the origin module of the function to which it&#x27;s attached.

#### Properties

* `moduleId: string` - The id of the module from which the item originated.
* `moduleMember: string` - The member name of the export on the module object from which the item originated.

#### Methods


* `static get(fn: Function): Origin` - Get the Origin metadata for the specified function.
  * `fn: Function` - The function to inspect for Origin metadata.


* `static set(fn: Function, origin: Origin): void` - Set the Origin metadata for the specified function.
  * `fn: Function` - No description available
  * `origin: Origin` - No description available



## Interfaces


### DecoratorApplicator

An object capable of applying it&#x27;s captured decorators to a target.

#### Properties


#### Methods


* `on(target: any, key?: string, descriptor?: PropertyDescriptor): any` - Applies the decorators to the target.
  * `target: any` - The target.
  * `key?: string` - If applying to a method, the member name.
  * `descriptor?: PropertyDescriptor` - If applying to a method, you may supply an initial descriptor to pass to the decorators.




### DeprecatedOptions

Options that control how the deprected decorator should function at runtime.

#### Properties

* `error: boolean` - Specifies whether or not the deprecation should throw an error.
* `message: string` - Specifies a custom deprecation message.

#### Methods



### MetadataType

Helpers for working with metadata on functions.

#### Properties

* `paramTypes: string` - The metadata key representing parameter type information.
* `properties: string` - The metadata key representing property information.
* `propertyType: string` - The metadata key representing object property type information.
* `resource: string` - The metadata key representing pluggable resources.

#### Methods


* `define(metadataKey: string, metadataValue: Object, target: Function, targetKey?: string): void` - Defines metadata specified by a key on a target.
  * `metadataKey: string` - The key for the metadata to define.
  * `metadataValue: Object` - No description available.
  * `target: Function` - The target to set the metadata on.
  * `targetKey?: string` - The member on the target to set the metadata on.



* `get(metadataKey: string, target: Function, targetKey?: string): Object` - Gets metadata specified by a key on a target, searching up the inheritance hierarchy.
  * `metadataKey: string` - The key for the metadata to lookup.
  * `target: Function` - The target to lookup the metadata on.
  * `targetKey?: string` - The member on the target to lookup the metadata on.



* `getOrCreateOwn(metadataKey: string, Type: Function, target: Function, targetKey?: string): Object` - Gets metadata specified by a key on a target, or creates an instance of the specified metadata if not found.
  * `metadataKey: string` - The key for the metadata to lookup or create.
  * `Type: Function` - The type of metadata to create if existing metadata is not found.
  * `target: Function` - The target to lookup or create the metadata on.
  * `targetKey?: string` - The member on the target to lookup or create the metadata on.



* `getOwn(metadataKey: string, target: Function, targetKey?: string): Object` - Gets metadata specified by a key on a target, only searching the own instance.
  * `metadataKey: string` - The key for the metadata to lookup.
  * `target: Function` - The target to lookup the metadata on.
  * `targetKey?: string` - The member on the target to lookup the metadata on.




### ProtocolOptions

Options used during protocol creation.

#### Properties

* `compose: ` - A function which has the opportunity to compose additional behavior into the decorated class when the protocol is applied.
* `validate: ` - A function that will be run to validate the decorated class when the protocol is applied. It is also used to validate adhoc instances.
If the validation fails, a message should be returned which directs the developer in how to address the issue.

#### Methods



## Constants

* `metadata: MetadataType` - Provides helpers for working with metadata.

## Functions


* `decorators(rest: Function): DecoratorApplicator` - Enables applying decorators, particularly for use when there is no syntax support in the language, such as with ES5 and ES2016.
  * `rest: Function` - The decorators to apply.



* `deprecated(optionsOrTarget?: DeprecatedOptions, maybeKey?: string, maybeDescriptor?: Object): any` - Decorator: Enables marking methods as deprecated.
  * `optionsOrTarget?: DeprecatedOptions` - Options for how the deprected decorator should function at runtime.

  * `maybeKey?: string` - No description available.
  * `maybeDescriptor?: Object` - No description available.


* `mixin(behavior: Object): any` - Decorator: Enables mixing behaior into a class.
  * `behavior: Object` - An object with keys for each method to mix into the target class.



* `protocol(name: string, options?: ): any` - Decorator: Creates a protocol.
  * `name: string` - The name of the protocol.
  * `options?: ` - The validation function or options object used in configuring the protocol.


