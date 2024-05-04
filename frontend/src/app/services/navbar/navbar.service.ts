import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Injectable()
export class NavbarService {
  public showContainer: boolean = true;
  public showNavBar: boolean = true;
  public fixedNavBar: boolean = false;

  constructor() {}

  public toggleLeftContainter() {
    this.showContainer = false;
  }

  toggleRightContainer = new Subject<void>();

  toggleRightContainerFunction() {
    this.toggleRightContainer.next();
  }

  get toggleRightObservable() {
    return this.toggleRightContainer.asObservable();
  }

  private divId: string = '';

  setDivId(id: string) {
    this.divId = id;
  }

  getDivId() {
    return this.divId;
  }

  private notifySubject = new Subject<any>();

  notify$ = this.notifySubject.asObservable();

  notify(event: any) {
    this.notifySubject.next(event);
  }
}
