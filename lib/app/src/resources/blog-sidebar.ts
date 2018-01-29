import {inject} from 'aurelia-dependency-injection';
import {Configuration} from '../configuration';

const headerHeight = 164;
const margin = 32;

@inject(Element, Configuration)
export class BlogSidebar {
  blog: any;
  mainElement: Element;

  constructor(private element: HTMLElement, private config: Configuration) {
    this.blog = config.blog;
  }

  onScroll = () => {
    let top = headerHeight;

    if(this.mainElement.scrollTop > (headerHeight - margin)) {
      top = this.mainElement.scrollTop + margin;
    }

    this.element.style.top = top.toString() + 'px';
  };

  attached() {
    this.mainElement = document.getElementsByTagName('main')[0];
    this.mainElement.addEventListener('scroll', this.onScroll);
  }

  detached() {
    this.mainElement.removeEventListener('scroll', this.onScroll);
  }
}
