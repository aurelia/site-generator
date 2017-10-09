# Templating-Binding Module

> An implementation of the templating engine&#x27;s Binding Language abstraction which uses a pluggable command syntax.

## Classes


### AttributeMap

No description available.

#### Properties

* `allElements: any` - No description available.
* `elements: any` - No description available.
* `static inject: any` - No description available.

#### Methods


* `map(elementName?: any, attributeName?: any): any` - Returns the javascript property name for a particlar HTML attribute.
  * `elementName?: any` - No description available
  * `attributeName?: any` - No description available


* `register(elementName?: any, attributeName?: any, propertyName?: any): any` - Maps a specific HTML element attribute to a javascript property.
  * `elementName?: any` - No description available
  * `attributeName?: any` - No description available
  * `propertyName?: any` - No description available


* `registerUniversal(attributeName?: any, propertyName?: any): any` - Maps an HTML attribute to a javascript property.
  * `attributeName?: any` - No description available
  * `propertyName?: any` - No description available



### ChildInterpolationBinding

No description available.

#### Properties


#### Methods


* `bind(source?: any): any` - 
  * `source?: any` - No description available


* `call(): any` - 


* `connect(evaluate?: any): any` - 
  * `evaluate?: any` - No description available


* `unbind(): any` - 


* `updateTarget(value?: any): any` - 
  * `value?: any` - No description available



### InterpolationBinding

No description available.

#### Properties


#### Methods


* `bind(source?: any): any` - 
  * `source?: any` - No description available


* `interpolate(): any` - 


* `unbind(): any` - 


* `updateOneTimeBindings(): any` - 



### InterpolationBindingExpression

No description available.

#### Properties


#### Methods


* `createBinding(target?: any): any` - 
  * `target?: any` - No description available



### SyntaxInterpreter

No description available.

#### Properties

* `static inject: any` - No description available.

#### Methods


* `bind(resources?: any, element?: any, info?: any, existingInstruction?: any, context?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available
  * `context?: any` - No description available


* `call(resources?: any, element?: any, info?: any, existingInstruction?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available


* `capture(resources?: any, element?: any, info?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available


* `delegate(resources?: any, element?: any, info?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available


* `determineDefaultBindingMode(element?: any, attrName?: any, context?: any): any` - 
  * `element?: any` - No description available
  * `attrName?: any` - No description available
  * `context?: any` - No description available


* `for(resources?: any, element?: any, info?: any, existingInstruction?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available


* `from-view(resources?: any, element?: any, info?: any, existingInstruction?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available


* `handleUnknownCommand(resources?: any, element?: any, info?: any, existingInstruction?: any, context?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available
  * `context?: any` - No description available


* `interpret(resources?: any, element?: any, info?: any, existingInstruction?: any, context?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available
  * `context?: any` - No description available


* `one-time(resources?: any, element?: any, info?: any, existingInstruction?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available


* `options(resources?: any, element?: any, info?: any, existingInstruction?: any, context?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available
  * `context?: any` - No description available


* `to-view(resources?: any, element?: any, info?: any, existingInstruction?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available


* `trigger(resources?: any, element?: any, info?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available


* `two-way(resources?: any, element?: any, info?: any, existingInstruction?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `info?: any` - No description available
  * `existingInstruction?: any` - No description available



### TemplatingBindingLanguage

No description available.

#### Properties

* `static inject: any` - No description available.

#### Methods


* `createAttributeInstruction(resources?: any, element?: any, theInfo?: any, existingInstruction?: any, context?: any): any` - 
  * `resources?: any` - No description available
  * `element?: any` - No description available
  * `theInfo?: any` - No description available
  * `existingInstruction?: any` - No description available
  * `context?: any` - No description available


* `inspectAttribute(resources?: any, elementName?: any, attrName?: any, attrValue?: any): any` - 
  * `resources?: any` - No description available
  * `elementName?: any` - No description available
  * `attrName?: any` - No description available
  * `attrValue?: any` - No description available


* `inspectTextContent(resources?: any, value?: any): any` - 
  * `resources?: any` - No description available
  * `value?: any` - No description available


* `parseInterpolation(resources?: any, value?: any): any` - 
  * `resources?: any` - No description available
  * `value?: any` - No description available



## Interfaces


## Constants


## Functions


* `configure(config?: any): any` - 
  * `config?: any` - No description available.

