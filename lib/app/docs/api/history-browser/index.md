# History-Browser Module

> An implementation of the Aurelia history interface based on standard browser hash change and push state mechanisms.

## Classes


### BrowserHistory

An implementation of the basic history API.

#### Properties

* `static inject: any` - No description available.

#### Methods


* `activate(options?: Object): boolean` - Activates the history object.
  * `options?: Object` - The set of options to activate history with.


* `deactivate(): void` - Deactivates the history object.


* `getAbsoluteRoot(): string` - Returns the fully-qualified root of the current history object.


* `navigate(fragment?: string, undefined?: any): boolean` - Causes a history navigation to occur.
  * `fragment?: string` - The history fragment to navigate to.
  * `undefined?: any` - No description available


* `navigateBack(): void` - Causes the history state to navigate back.


* `setTitle(title: string): void` - Sets the document title.
  * `title: string` - No description available



### DefaultLinkHandler

The default LinkHandler implementation. Navigations are triggered by click events on
anchor elements with relative hrefs when the history instance is using pushstate.

#### Properties


#### Methods


* `activate(history: BrowserHistory): void` - Activate the instance.
  * `history: BrowserHistory` - The BrowserHistory instance that navigations should be dispatched to.



* `deactivate(): void` - Deactivate the instance. Event handlers and other resources should be cleaned up here.


* `static findClosestAnchor(el: Element): Element` - Finds the closest ancestor that&#x27;s an anchor element.
  * `el: Element` - The element to search upward from.


* `static getEventInfo(event: Event): AnchorEventInfo` - Gets the href and a &quot;should handle&quot; recommendation, given an Event.
  * `event: Event` - The Event to inspect for target anchor and href.



* `static targetIsThisWindow(target: Element): boolean` - Gets a value indicating whether or not an anchor targets the current window.
  * `target: Element` - The anchor element whose target should be inspected.



### LinkHandler

Class responsible for handling interactions that should trigger browser history navigations.

#### Properties


#### Methods


* `activate(history: BrowserHistory): void` - Activate the instance.
  * `history: BrowserHistory` - The BrowserHistory instance that navigations should be dispatched to.



* `deactivate(): void` - Deactivate the instance. Event handlers and other resources should be cleaned up here.



## Interfaces


### AnchorEventInfo

Provides information about how to handle an anchor event.

#### Properties

* `anchor: Element` - The anchor element or null if not-applicable.
* `href: string` - The href of the link or null if not-applicable.
* `shouldHandleEvent: boolean` - Indicates whether the event should be handled or not.

#### Methods



## Constants


## Functions


* `configure(config: Object): void` - Configures the plugin by registering BrowserHistory as the implementation of History in the DI container.
  * `config: Object` - The FrameworkConfiguration object provided by Aurelia.


