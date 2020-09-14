import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavbarCloseService {
  public onTriggerNav: EventEmitter<any> = new EventEmitter();

  constructor() {}

  showCloseSideNav(trigger: boolean) {
    console.log('Emmiting trigger', trigger);

    this.onTriggerNav.emit(trigger);
  }
}
