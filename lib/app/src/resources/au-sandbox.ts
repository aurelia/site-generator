import { noView, customElement, inject, bindable } from 'aurelia-framework';

@customElement('au-sandbox')
@noView()
@inject(Element)
export class AuSandbox {
  @bindable src = '';
  @bindable heading = '';

  constructor(private element: Element) {}

  bind() {
    this.element.innerHTML = `<iframe src="${this.src}" style="width:100%; height:500px; border:0; border-radius: 4px; border: 1px solid rgb(36, 40, 42); overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`;
  }
}
