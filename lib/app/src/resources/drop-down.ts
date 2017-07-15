import {
  processContent,
  bindingMode, bindable,
  DOM, FEATURE
} from 'aurelia-framework';

@processContent(childrenAsTemplateParts('selected-item-template', 'list-item-template'))
export class DropDown {
  @bindable items;
  @bindable displayExpression = '$this';
  @bindable({ defaultBindingMode: bindingMode.twoWay }) selectedItem;

  button: HTMLElement;
  listIsOpen = false;

  select(item) {
    this.selectedItem = item;
  }

  toggleList = (event?: Event) => {
    if (this.listIsOpen) {
      this.listIsOpen = false;
      DOM.removeEventListener('click', this.toggleList, false);
    } else {
      this.listIsOpen = true;
      setTimeout(() => DOM.addEventListener('click', this.toggleList, false));
    }
  }
}

function childrenAsTemplateParts(...partNames: string[]) {
  return function convertChildElementsToTemplateParts(compiler, resources, node: HTMLElement, instruction) {
    let currentChild = node.firstElementChild;

    while (currentChild) {
      let nextSibling = currentChild.nextElementSibling;
      let elementName = currentChild.tagName.toLowerCase();

      if (partNames.indexOf(elementName) !== -1) {
        let template = <HTMLTemplateElement>DOM.createElement('template');
        (<any>FEATURE).ensureHTMLTemplateElement(template);
        let content = template.content;

        while(currentChild.firstChild) {
          content.appendChild(currentChild.firstChild);
        }

        template.setAttribute('replace-part', elementName);
        DOM.replaceNode(template, currentChild, node);
      }

      currentChild = nextSibling;
    }

    return true;
  }
}
