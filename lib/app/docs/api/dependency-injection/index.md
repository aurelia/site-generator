# Dependency Injection Module

## Classes


### All

Used to allow functions/classes to specify resolution of all matches to a key.

#### Properties


#### Methods


* `get(container: Container): any` - Called by the container to resolve all matching dependencies as an array of instances.
  * `container:Container` - The container to resolve from.


* `of(key: any): All` - Creates an All Resolver for the supplied key.
  * `key:any` - The key to resolve all instances for.



### Container

A lightweight, extensible dependency injection container.

#### Properties

* `parent:Container` - The parent container in the DI hierarchy.
* `root:Container` - The root container in the DI hierarchy.
* `instance:Container` - The global root Container instance. Available if makeGlobal() has been called. Aurelia Framework calls makeGlobal().

#### Methods


* `_createInvocationHandler(fn: Function &amp; { inject?: any; }): InvocationHandler` - 
  * `fn:Function &amp; { inject?: any; }` - No description available


* `_get(key: any): any` - 
  * `key:any` - No description available


* `autoRegister(key: any, fn?: Function): Resolver` - Registers a type (constructor function) by inspecting its registration annotations. If none are found, then the default singleton registration is used.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.
  * `fn?:Function` - The constructor function to use when the dependency needs to be instantiated. This defaults to the key value when fn is not supplied.



* `autoRegisterAll(fns: any): void` - Registers an array of types (constructor functions) by inspecting their registration annotations. If none are found, then the default singleton registration is used.
  * `fns:any` - The constructor function to use when the dependency needs to be instantiated.



* `createChild(): Container` - Creates a new dependency injection container whose parent is the current container.


* `get(key: any): any` - Resolves a single instance based on the provided key.
  * `key:any` - The key that identifies the object to resolve.


* `getAll(key: any): any` - Resolves all instance registered under the provided key.
  * `key:any` - The key that identifies the objects to resolve.


* `getResolver(key: any): any` - Gets the resolver for the particular key, if it has been registered.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.


* `hasResolver(key: any, checkParent?: boolean): boolean` - Inspects the container to determine if a particular key has been registred.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.
  * `checkParent?:boolean` - Indicates whether or not to check the parent container hierarchy.


* `invoke(fn: Function &amp; { name?: string; }, dynamicDependencies?: any): any` - Invokes a function, recursively resolving its dependencies.
  * `fn:Function &amp; { name?: string; }` - The function to invoke with the auto-resolved dependencies.
  * `dynamicDependencies?:any` - Additional function dependencies to use during invocation.


* `makeGlobal(): Container` - Makes this container instance globally reachable through Container.instance.


* `registerAlias(originalKey: any, aliasKey: any): Resolver` - Registers an additional key that serves as an alias to the original DI key.
  * `originalKey:any` - The key that originally identified the dependency; usually a constructor function.
  * `aliasKey:any` - An alternate key which can also be used to resolve the same dependency  as the original.


* `registerHandler(key: any, handler: ): Resolver` - Registers a custom resolution function such that the container calls this function for each request to obtain the instance.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.
  * `handler:` - The resolution function to use when the dependency is needed.


* `registerInstance(key: any, instance?: any): Resolver` - Registers an existing object instance with the container.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.
  * `instance?:any` - The instance that will be resolved when the key is matched. This defaults to the key value when instance is not supplied.


* `registerResolver(key: any, resolver: Resolver): Resolver` - Registers a custom resolution function such that the container calls this function for each request to obtain the instance.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.
  * `resolver:Resolver` - The resolver to use when the dependency is needed.


* `registerSingleton(key: any, fn?: Function): Resolver` - Registers a type (constructor function) such that the container always returns the same instance for each request.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.
  * `fn?:Function` - The constructor function to use when the dependency needs to be instantiated. This defaults to the key value when fn is not supplied.


* `registerTransient(key: any, fn?: Function): Resolver` - Registers a type (constructor function) such that the container returns a new instance for each request.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.
  * `fn?:Function` - The constructor function to use when the dependency needs to be instantiated. This defaults to the key value when fn is not supplied.


* `setHandlerCreatedCallback(onHandlerCreated: ): void` - Sets an invocation handler creation callback that will be called when new InvocationsHandlers are created (called once per Function).
  * `onHandlerCreated:` - The callback to be called when an InvocationsHandler is created.



* `unregister(key: any): void` - Unregisters based on key.
  * `key:any` - The key that identifies the dependency at resolution time; usually a constructor function.




### Factory

Used to allow injecting dependencies but also passing data to the constructor.

#### Properties


#### Methods


* `get(container: Container): any` - Called by the container to pass the dependencies to the constructor.
  * `container:Container` - The container to invoke the constructor with dependencies and other parameters.


* `of(key: any): Factory` - Creates a Factory Resolver for the supplied key.
  * `key:any` - The key to resolve.



### FactoryInvoker

An Invoker that is used to invoke a factory method.

#### Properties

* `instance:FactoryInvoker` - The singleton instance of the FactoryInvoker.

#### Methods


* `invoke(container: Container, fn: Function, dependencies: any): any` - Invokes the function with the provided dependencies.
  * `container:Container` - The calling container.
  * `fn:Function` - The constructor or factory function.
  * `dependencies:any` - The dependencies of the function call.


* `invokeWithDynamicDependencies(container: Container, fn: Function, staticDependencies: any, dynamicDependencies: any): any` - Invokes the function with the provided dependencies.
  * `container:Container` - The calling container.
  * `fn:Function` - The constructor or factory function.
  * `staticDependencies:any` - The static dependencies of the function.
  * `dynamicDependencies:any` - Additional dependencies to use during invocation.



### InvocationHandler

Stores the information needed to invoke a function.

#### Properties

* `dependencies:any` - The statically known dependencies of this function invocation.
* `fn:Function` - The function to be invoked by this handler.
* `invoker:Invoker` - The invoker implementation that will be used to actually invoke the function.

#### Methods


* `invoke(container: Container, dynamicDependencies?: any): any` - Invokes the function.
  * `container:Container` - The calling container.
  * `dynamicDependencies?:any` - Additional dependencies to use during invocation.



### Lazy

Used to allow functions/classes to specify lazy resolution logic.

#### Properties


#### Methods


* `get(container: Container): any` - Called by the container to lazily resolve the dependency into a lazy locator function.
  * `container:Container` - The container to resolve from.


* `of(key: any): Lazy` - Creates a Lazy Resolver for the supplied key.
  * `key:any` - The key to lazily resolve.



### NewInstance

Used to inject a new instance of a dependency, without regard for existing
instances in the container. Instances can optionally be registered in the container
under a different key by supplying a key using the &#x60;as&#x60; method.

#### Properties

* `asKey:any` - No description available.
* `key:any` - No description available.

#### Methods


* `as(key: any): ` - Instructs the NewInstance resolver to register the resolved instance using the supplied key.
  * `key:any` - The key to register the instance with.


* `get(container: any): any` - Called by the container to instantiate the dependency and potentially register
as another key if the &#x60;as&#x60; method was used.
  * `container:any` - The container to resolve the parent from.


* `of(key: any, dynamicDependencies: any): NewInstance` - Creates an NewInstance Resolver for the supplied key.
  * `key:any` - The key to resolve/instantiate.
  * `dynamicDependencies:any` - An optional list of dynamic dependencies.



### Optional

Used to allow functions/classes to specify an optional dependency, which will be resolved only if already registred with the container.

#### Properties


#### Methods


* `get(container: Container): any` - Called by the container to provide optional resolution of the key.
  * `container:Container` - The container to resolve from.


* `of(key: any, checkParent?: boolean): Optional` - Creates an Optional Resolver for the supplied key.
  * `key:any` - The key to optionally resolve for.
  * `checkParent?:boolean` - No description available



### Parent

Used to inject the dependency from the parent container instead of the current one.

#### Properties


#### Methods


* `get(container: Container): any` - Called by the container to load the dependency from the parent container
  * `container:Container` - The container to resolve the parent from.


* `of(key: any): Parent` - Creates a Parent Resolver for the supplied key.
  * `key:any` - The key to resolve.



### SingletonRegistration

Used to allow functions/classes to indicate that they should be registered as singletons with the container.

#### Properties


#### Methods


* `registerResolver(container: Container, key: any, fn: Function): Resolver` - Called by the container to register the resolver.
  * `container:Container` - The container the resolver is being registered with.
  * `key:any` - The key the resolver should be registered as.
  * `fn:Function` - The function to create the resolver for.



### StrategyResolver

No description available.

#### Properties

* `state:any` - No description available.
* `strategy:` - No description available.

#### Methods


* `get(container: Container, key: any): any` - Called by the container to allow custom resolution of dependencies for a function/class.
  * `container:Container` - The container to resolve from.
  * `key:any` - The key that the resolver was registered as.



### TransientRegistration

Used to allow functions/classes to indicate that they should be registered as transients with the container.

#### Properties


#### Methods


* `registerResolver(container: Container, key: any, fn: Function): Resolver` - Called by the container to register the resolver.
  * `container:Container` - The container the resolver is being registered with.
  * `key:any` - The key the resolver should be registered as.
  * `fn:Function` - The function to create the resolver for.



## Interfaces


### ContainerConfiguration

Used to configure a Container instance.

#### Properties

* `handlers:Map` - No description available.
* `onHandlerCreated:` - An optional callback which will be called when any function needs an InvocationHandler created (called once per Function).

#### Methods



### Invoker

A strategy for invoking a function, resulting in an object instance.

#### Properties


#### Methods


* `invoke(container: Container, fn: Function, dependencies: any): any` - Invokes the function with the provided dependencies.
  * `container:Container` - No description available.
  * `fn:Function` - The constructor or factory function.
  * `dependencies:any` - The dependencies of the function call.


* `invokeWithDynamicDependencies(container: Container, fn: Function, staticDependencies: any, dynamicDependencies: any): any` - Invokes the function with the provided dependencies.
  * `container:Container` - No description available.
  * `fn:Function` - The constructor or factory function.
  * `staticDependencies:any` - The static dependencies of the function.
  * `dynamicDependencies:any` - Additional dependencies to use during invocation.



### Registration

Customizes how a particular function is resolved by the Container.

#### Properties


#### Methods


* `registerResolver(container: Container, key: any, fn: Function): Resolver` - Called by the container to register the resolver.
  * `container:Container` - The container the resolver is being registered with.
  * `key:any` - The key the resolver should be registered as.
  * `fn:Function` - The function to create the resolver for.



### Resolver

Used to allow functions/classes to specify custom dependency resolution logic.

#### Properties


#### Methods


* `get(container: Container, key: any): any` - Called by the container to allow custom resolution of dependencies for a function/class.
  * `container:Container` - The container to resolve from.
  * `key:any` - The key that the resolver was registered as.



## Variables

* `_emptyParameters:any` - No description available.
* `resolver:Function &amp; { decorates?: any; }` - Decorator: Indicates that the decorated class/object is a custom resolver.

## Functions


* `all(keyValue: any): ` - Decorator: Specifies the dependency should load all instances of the given key.
  * `keyValue:any` - No description available.


* `autoinject(potentialTarget?: any): any` - Decorator: Directs the TypeScript transpiler to write-out type metadata for the decorated class.
  * `potentialTarget?:any` - No description available.


* `factory(keyValue: any, asValue?: any): ` - Decorator: Specifies the dependency to create a factory method, that can accept optional arguments
  * `keyValue:any` - No description available.
  * `asValue?:any` - No description available.


* `getDecoratorDependencies(target: any, name: any): any` - 
  * `target:any` - No description available.
  * `name:any` - No description available.


* `inject(rest: any): any` - Decorator: Specifies the dependencies that should be injected by the DI Container into the decoratored class/function.
  * `rest:any` - No description available.


* `invokeAsFactory(potentialTarget?: any): any` - Decorator: Specifies that the decorated item should be called as a factory function, rather than a constructor.
  * `potentialTarget?:any` - No description available.


* `invoker(value: Invoker): any` - Decorator: Specifies a custom Invoker for the decorated item.
  * `value:Invoker` - No description available.


* `lazy(keyValue: any): ` - Decorator: Specifies the dependency should be lazy loaded
  * `keyValue:any` - No description available.


* `newInstance(asKeyOrTarget?: any, dynamicDependencies: any): ` - Decorator: Specifies the dependency as a new instance
  * `asKeyOrTarget?:any` - No description available.
  * `dynamicDependencies:any` - No description available.


* `optional(checkParentOrTarget?: boolean): ` - Decorator: Specifies the dependency as optional
  * `checkParentOrTarget?:boolean` - No description available.


* `parent(target: any, key: any, index: any): void` - Decorator: Specifies the dependency to look at the parent container for resolution
  * `target:any` - No description available.
  * `key:any` - No description available.
  * `index:any` - No description available.


* `registration(value: Registration): any` - Decorator: Specifies a custom registration strategy for the decorated class/function.
  * `value:Registration` - No description available.


* `singleton(keyOrRegisterInChild?: any, registerInChild?: boolean): any` - Decorator: Specifies to register the decorated item with a &quot;singleton&quot; lifetime.
  * `keyOrRegisterInChild?:any` - No description available.
  * `registerInChild?:boolean` - No description available.


* `transient(key?: any): any` - Decorator: Specifies to register the decorated item with a &quot;transient&quot; lifetime.
  * `key?:any` - No description available.

