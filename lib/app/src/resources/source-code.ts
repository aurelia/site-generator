export class SourceCode {
  src: string;
  lang: string;
  code: string;

  constructor(element: Element) {
    this.src = element.getAttribute('src');
    this.lang = element.getAttribute('lang');
    this.code = element.innerHTML;
  }

  static processContent(compiler, resources, element, instruction) {
    let currentChild = element.firstChild;
    let availableSources = instruction.availableSources = [];

    while (currentChild) {
      if (currentChild.tagName === 'SOURCE-CODE') {
        availableSources.push(new SourceCode(currentChild));
      }

      currentChild = currentChild.nextSibling;
    }

    element.innerHTML = '';
    return false;
  }
}
