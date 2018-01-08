import {inject} from 'aurelia-dependency-injection';

const headerHeight = 164;
const margin = 32;

@inject(Element)
export class BlogSidebar {
  name = 'Aurelia';
  twitterHref = 'https://twitter.com/aureliaeffect';
  githubHref = 'https://github.com/aurelia/framework';
  vimeoHref = 'https://vimeo.com/channels/867847';
  gitterHref = 'https://gitter.im/aurelia/Discuss';

  mainElement: Element;

  constructor(private element: HTMLElement) {}

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
