# History API

## Classes


### History

An abstract base class for implementors of the basic history api.

#### Properties


#### Methods


* `activate(options: Object): boolean` - Activates the history object.
  * `options:Object` - The set of options to activate history with.


* `deactivate(): void` - Deactivates the history object.


* `getAbsoluteRoot(): string` - Returns the fully-qualified root of the current history object.


* `navigate(fragment: string, options?: NavigationOptions): boolean` - Causes a history navigation to occur.
  * `fragment:string` - The history fragment to navigate to.
  * `options?:NavigationOptions` - The set of options that specify how the navigation should occur.


* `navigateBack(): void` - Causes the history state to navigate back.


* `setTitle(title: string): void` - Updates the title associated with the current location.
  * `title:string` - No description available



## Interfaces


### NavigationOptions

The options that can be specified as part of a history navigation request.

#### Properties

* `replace:boolean` - Replace the existing route.
* `trigger:boolean` - Trigger the router.

#### Methods



## Variables


## Functions

