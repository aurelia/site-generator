import { noView, customElement, inject, bindable } from 'aurelia-framework';

@customElement('au-sandbox')
@noView()
@inject(Element)
export class AuSandbox {
  @bindable src = '';
  @bindable heading = '';

  private visibilityObserver: IntersectionObserver;

  constructor(private element: Element) {
    element.innerHTML = `<iframe style="width:100%; height:500px; border:0; border-radius: 4px; border: 2px solid rgb(36, 40, 42); overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>`;
  }

  bind() {
    // Ensure we always use CodeMirror for inline demos.
    // It's much lighter-weight than Monico.
    if (this.src.indexOf('codemirror=1') === -1) {
      this.src += '&codemirror=1';
    }
  }

  attached() {
    const element = this.element;
    const iframe = element.firstChild as HTMLIFrameElement;

    if (typeof IntersectionObserver !== 'undefined') {
      let observer = this.visibilityObserver = new IntersectionObserver(records => {
        records.forEach(record => {
          if (record.target === element) {
            if (record.isIntersecting) {
              iframe.src = this.src;
            }
            observer.disconnect();
            this.visibilityObserver = observer = undefined;
          }
        });
      });
      observer.observe(element);
    } else {
      iframe.src = this.src;
    }
  }

  detached() {
    const observer = this.visibilityObserver;
    if (observer !== undefined) {
      observer.disconnect();
      this.visibilityObserver = undefined;
    }
  }
}
