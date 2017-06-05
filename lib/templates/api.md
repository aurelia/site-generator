# {{name}} Module

## Classes

{{#each classes}}

### {{name}}

{{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}

#### Properties

{{#each properties}}
* `{{#if flags.isStatic}}static {{/if}}{{name}}: {{type.name}}` - {{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}
{{/each}}

#### Methods

{{#each methods}}

* `{{#if flags.isStatic}}static {{/if}}{{name}}({{#each signatures.0.parameters}}{{name}}{{#if flags.isOptional}}?{{/if}}: {{type.name}}{{#unless @last}}, {{/unless}}{{/each}}): {{signatures.0.type.name}}` - {{signatures.0.comment.shortText}}
  {{#each signatures.0.parameters}}
  * `{{name}}{{#if flags.isOptional}}?{{/if}}: {{type.name}}` - {{#if comment.text}}{{comment.text}}{{else}}No description available{{/if}}
  {{/each}}

{{/each}}

{{/each}}

## Interfaces

{{#each interfaces}}

### {{name}}

{{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}

#### Properties

{{#each properties}}
* `{{#if flags.isStatic}}static {{/if}}{{name}}: {{type.name}}` - {{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}
{{/each}}

#### Methods

{{#each methods}}

* `{{#if flags.isStatic}}static {{/if}}{{name}}({{#each signatures.0.parameters}}{{name}}{{#if flags.isOptional}}?{{/if}}: {{type.name}}{{#unless @last}}, {{/unless}}{{/each}}): {{signatures.0.type.name}}` - {{signatures.0.comment.shortText}}
  {{#each signatures.0.parameters}}
  * `{{name}}{{#if flags.isOptional}}?{{/if}}: {{type.name}}` - {{#if comment.text}}{{comment.text}}{{else}}No description available.{{/if}}
  {{/each}}

{{/each}}

{{/each}}

## Constants

{{#each constants}}
* `{{#if flags.isStatic}}static {{/if}}{{name}}: {{type.name}}` - {{#if comment.shortText}}{{comment.shortText}}{{else}}No description available.{{/if}}
{{/each}}

## Functions

{{#each functions}}

* `{{#if flags.isStatic}}static {{/if}}{{name}}({{#each signatures.0.parameters}}{{name}}{{#if flags.isOptional}}?{{/if}}: {{type.name}}{{#unless @last}}, {{/unless}}{{/each}}): {{signatures.0.type.name}}` - {{signatures.0.comment.shortText}}
  {{#each signatures.0.parameters}}
  * `{{name}}{{#if flags.isOptional}}?{{/if}}: {{type.name}}` - {{#if comment.text}}{{comment.text}}{{else}}No description available.{{/if}}
  {{/each}}

{{/each}}
