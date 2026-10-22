import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  devansthanamName!: any;
  constructor(
    private sharedService: SharedService, private router: Router
  ) {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser'));

    this.devansthanamName = currentUser?.devansthanamName || 'Paymetrix';
  }

isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }

  closeNavbar() {
    this.isNavbarOpen = false;
  }

  logout() {
    this.router.navigate(['/login']);
    this.sharedService.SuccessAlert("Logged Out Successfully");
    localStorage.clear();
  }

}
