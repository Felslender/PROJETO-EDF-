import { NavbarService } from 'src/app/services/navbar/navbar.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private navbarService: NavbarService) {}

  get showNavBar() {
    return this.navbarService.showNavBar;
  }
  get fixedNavBar() {
    return this.navbarService.fixedNavBar;
  }
  title = 'EDF';
}
