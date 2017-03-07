# {{name}} API

## Classes

{{#each classes}}

### {{name}}

{{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}

#### Properties

{{#each properties}}
* `{{name}}:{{type.name}}` - {{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}
{{/each}}

#### Methods

{{#each methods}}

* `{{name}}({{#each signatures.0.parameters}}{{name}}: {{type.name}}{{#unless @last}}, {{/unless}}{{/each}}): {{signatures.0.type.name}}` - {{signatures.0.comment.shortText}}
  {{#each signatures.0.parameters}}
  * `{{name}}:{{type.name}}` - {{#if comment.text}}{{comment.text}}{{else}}No description available{{/if}}
  {{/each}}

{{/each}}

{{/each}}

## Interfaces

{{#each interfaces}}

### {{name}}

{{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}

#### Properties

{{#each properties}}
* `{{name}}:{{type.name}}` - {{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}
{{/each}}

#### Methods

{{#each methods}}

* `{{name}}({{#each signatures.0.parameters}}{{name}}: {{type.name}}{{#unless @last}}, {{/unless}}{{/each}}): {{signatures.0.type.name}}` - {{signatures.0.comment.shortText}}
  {{#each signatures.0.parameters}}
  * `{{name}}:{{type.name}}` - {{#if comment.text}}{{comment.text}}{{else}}No description available.{{/if}}
  {{/each}}

{{/each}}

{{/each}}

## Variables

{{#each variables}}
* `{{name}}:{{type.name}}` - {{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}
{{/each}}

## Functions

{{#each functions}}

* `{{name}}({{#each signatures.0.parameters}}{{name}}: {{type.name}}{{#unless @last}}, {{/unless}}{{/each}}): {{signatures.0.type.name}}` - {{signatures.0.comment.shortText}}
  {{#each signatures.0.parameters}}
  * `{{name}}:{{type.name}}` - {{#if comment.text}}{{comment.text}}{{else}}No description available.{{/if}}
  {{/each}}

{{/each}}
