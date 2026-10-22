import { Component, OnInit } from '@angular/core';;
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],

})
export class SidebarComponent implements OnInit {
dashboardRoute: string | null = null;
name!:any;
  isSidebarVisible = true;
  isSubmenuOpen = false;
  isDashboardSelected = false;
isRoleAdmin!: string ;
 
  constructor() {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('CurrentUser') || '{}');

  if (currentUser && currentUser.role) {
    this.isRoleAdmin = String(currentUser.role);
    this.name=String(currentUser.userName);
  }
switch (this.isRoleAdmin) {
    case '0':
      this.dashboardRoute = '/super-admin-dashboard';
      break;
    case '1':
      this.dashboardRoute = '/master-distrubutor-dashboard';
      break;
    case '2':
    this.dashboardRoute = '/distrubutor-dashboard';
     break;
    case '3':
      this.dashboardRoute = '/retailer-dashboard';
      break;
    default:
      this.dashboardRoute = null;
  }
 
  }

  toggleSidebar() {
   
  }


  toggleSubmenu() {
    this.isSubmenuOpen = !this.isSubmenuOpen;
  }


  selectDashboard() {
    this.isDashboardSelected = true;
  }
}
