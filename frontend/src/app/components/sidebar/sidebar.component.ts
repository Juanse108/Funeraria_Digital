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
    // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' },
    
    { path: '/administrators/list', title: 'Administrators',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/beneficiaries/list', title: 'Beneficiaries',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/burials/list', title: 'Burials',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/chats/list', title: 'Chats',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/comment_ratings/list', title: 'Comment_ratings',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/cremations/list', title: 'Cremations',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/customers/list', title: 'Customers',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/drivers/list', title: 'Drivers',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/messages/list', title: 'Messages',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/owners/list', title: 'Owners',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/payments/list', title: 'Payments',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/permissions/list', title: 'Permissions',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/plans/list', title: 'Plans',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/relocations/list', title: 'Relocation',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/roles/list', title: 'Roles',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/role_permissions/list', title: 'Role_Permission',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/rooms/list', title: 'Rooms',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/services/list', title: 'Services',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/service_executions/list', title: 'Service-execution',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/service_plans/list', title: 'Service_plans',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/sites/list', title: 'Sites',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/subscriptions/list', title: 'Subscriptions',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/users/list', title: 'Users',  icon:'ni-single-02 text-yellow', class: '' },
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
