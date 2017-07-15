import {inject} from 'aurelia-dependency-injection';
import {Parser} from 'aurelia-binding';
import {rebaseExpression} from './expression-rebaser';

@inject(Parser)
export class DynamicExpressionBindingBehavior {
  constructor(private parser: Parser) {}
  
  bind(binding, source, rawExpression) {
    // Parse the expression that was passed as a string argument to
    // the binding behavior.
    let expression = this.parser.parse(rawExpression);
    
    // Rebase the expression
    expression = rebaseExpression(expression, binding.sourceExpression);
    
    // Squirrel away the binding's original expression so we can restore
    // the binding to it's initial state later.
    binding.originalSourceExpression = binding.sourceExpression;

    // Replace the binding's expression.
    binding.sourceExpression = expression;
  }
  
  unbind(binding, source) {
    // Restore the binding to it's initial state.
    binding.sourceExpression = binding.originalSourceExpression;
    binding.originalSourceExpression = null;
  }
}
