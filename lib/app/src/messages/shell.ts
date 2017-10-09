import {DocItem} from '../configuration';

export class ActivateTab {
  constructor(public name: string) {}
}

export class ActivateScreen {
  constructor(public screen: any, public fragment?: string) {}
}

export class ActivateSection {
  constructor(public id: string, public replaceFragment = true) {}
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
