import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  type: number;
}
export const ROUTES: RouteInfo[] = [
  { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '', type: 0 },
  { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '', type: 0 },
  // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '', type: 0 },
  // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '', type: 0 },
  // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '', type: 0 },    

  // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/administrators/list', title: 'Administrators',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/beneficiaries/list', title: 'Beneficiaries',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/burials/list', title: 'Burials',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/chats/list', title: 'Chats',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/comment_ratings/list', title: 'Comment Ratings',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/cremations/list', title: 'Cremations',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/customers/list', title: 'Customers',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/drivers/list', title: 'Drivers',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/messages/list', title: 'Messages',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/owners/list', title: 'Owners',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/payments/list', title: 'Payments',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/permissions/list', title: 'Permissions',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/plans/list', title: 'Plans',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/relocations/list', title: 'Relocations',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/roles/list', title: 'Roles',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/role_permissions/list', title: 'Role-Permissions',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/rooms/list', title: 'Rooms',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/services/list', title: 'Services',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/service_executions/list', title: 'Service Executions',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/service_plans/list', title: 'Service-Plans',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/sites/list', title: 'Sites',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/subscriptions/list', title: 'Subscriptions',  icon:'ni-single-02 text-yellow', class: '', type: 1 },
  { path: '/users/list', title: 'Users',  icon:'ni-single-02 text-yellow', class: '', type: 1 },

	{ path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '', type: 2 },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  theUser: User;
  suscription: Subscription;

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private theSecurityService: SecurityService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
    this.suscription = this.theSecurityService.getUser().subscribe(data => {
      this.theUser = data;
    })
  }
}
