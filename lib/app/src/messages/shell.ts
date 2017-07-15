import {DocItem} from '../configuration';

export class ActivateScreen {
  constructor(public screen: any) {}
}

export class ActivateTab {
  constructor(public name: string) {}
}

export class ShowMenu {
  constructor(public item: DocItem) {}
}

export class HideMenu {}

export class ShowSearch {}
export class HideSearch {}

export class ActiveLanguageChanged {
  constructor(public language: string) {}
}
