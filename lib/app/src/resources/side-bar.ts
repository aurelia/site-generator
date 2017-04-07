import {EventAggregator} from 'aurelia-event-aggregator';
import {autoinject} from 'aurelia-dependency-injection';
import {History} from 'aurelia-history';
import {ShowMenu, HideMenu} from '../messages/shell';
import {Configuration, DocItem} from '../configuration';

@autoinject
export class SideBar {
  isActive = false;
  menu = null;

  $sidebarOne: HTMLElement;
  $sidebarTwo: HTMLElement;
  $currentSidebar: HTMLElement;

  constructor(private config: Configuration, private ea: EventAggregator, private history: History) {
    ea.subscribe(ShowMenu, (msg:ShowMenu) => {
      let backward = isBackward(this.menu, msg.item);
      
      this.menu = {
        config: this.config,
        activeItem: msg.item,
        items: msg.item.items || msg.item.parent.items,
        select: (item) => this.select(item)
      };

      this.showMenu(this.menu, backward);
      this.isActive = true;
    });

    ea.subscribe(HideMenu, (msg:HideMenu) => {
      this.isActive = false;
    });
  }

  select(item: DocItem) {
    if (item === this.menu.activeItem) {
      return;
    } else if (item.dest) {
      this.history.navigate(item.dest);
    }
  }

  showMenu(menu, backward = false) {
    if (this.$currentSidebar) {
      let newContent = this.$currentSidebar === this.$sidebarOne ? this.$sidebarTwo : this.$sidebarOne;
      let oldContent = this.$currentSidebar === this.$sidebarOne ? this.$sidebarOne : this.$sidebarTwo;
      this.$currentSidebar = newContent;
      animate(menu, newContent, oldContent, backward);
    } else {
      this.$currentSidebar = this.$sidebarOne;
      this.$sidebarOne.style.transition = 'none';
      this.$sidebarOne.style.transform = 'translate(0%, 0%)';
      this.$sidebarOne['au'].controller.viewModel.sidebar = menu;
      this.$sidebarTwo.style.transition = 'none';
      this.$sidebarTwo.style.transform = 'translate(100%, 0%)';
    }
  }
}

function isBackward(menu, nextItem: DocItem) {
  if (!menu) {
    return false;
  }

  let current = menu.activeItem;

  while(current) {
    if (current.parent === nextItem) {
      return true;
    }

    current = current.parent;
  }

  return false;
}

function animate(menu, newSidebar, oldSidebar, backward) {
  const transition = 'all .3s';

  if (backward) {
    newSidebar.style.transition = 'none';
    newSidebar.style.transform = 'translate(-100%, 0%)';
    newSidebar['au'].controller.viewModel.sidebar = menu;

    oldSidebar.style.transition = 'none';
    oldSidebar.style.transform = 'translate(0%, 0%)';

    setTimeout(() => {
      newSidebar.style.transition = transition;
      oldSidebar.style.transition = transition;

      newSidebar.style.transform = 'translate(0%, 0%)';
      oldSidebar.style.transform = 'translate(100%, 0%)';
    }, 100);
  } else {
    newSidebar.style.transition = 'none';
    newSidebar.style.transform = 'translate(100%, 0%)';
    newSidebar['au'].controller.viewModel.sidebar = menu;

    oldSidebar.style.transition = 'none';
    oldSidebar.style.transform = 'translate(0%, 0%)';

    setTimeout(() => {
      newSidebar.style.transition = transition;
      oldSidebar.style.transition = transition;

      newSidebar.style.transform = 'translate(0%, 0%)';
      oldSidebar.style.transform = 'translate(-100%, 0%)';
    }, 100);
  }
}
