import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    {
        path: "users",
        loadChildren: () => import('src/app/pages/users/users.module').then(m => m.UsersModule)
    },
    {
        path: "roles",
        loadChildren: () => import('src/app/pages/roles/roles.module').then(m => m.RolesModule)
    },
    {
        path: "permissions",
        loadChildren: () => import('src/app/pages/permissions/permissions.module').then(m => m.PermissionsModule)
    },
    {
        path: "role_permissions",
        loadChildren: () => import('src/app/pages/role-permissions/role-permissions.module').then(m => m.RolePermissionsModule)
    },
    {
        path: "customers",
        loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)
    },
    {
        path: "subscriptions",
        loadChildren: () => import('src/app/pages/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
    },
    {
        path: "service_executions",
        loadChildren: () => import('src/app/pages/service-executions/service-executions.module').then(m => m.ServiceExecutionsModule)
    },
    {
        path: "payments",
        loadChildren: () => import('src/app/pages/payments/payments.module').then(m => m.PaymentsModule)
    },
    {
        path: "comment_ratings",
        loadChildren: () => import('src/app/pages/comment-ratings/comment-ratings.module').then(m => m.CommentRatingsModule)
    },
    {
        path: "chats",
        loadChildren: () => import('src/app/pages/chats/chats.module').then(m => m.ChatsModule)
    },
    {
        path: "relocations",
        loadChildren: () => import('src/app/pages/relocations/relocations.module').then(m => m.RelocationsModule)
    },
    {
        path: "messages",
        loadChildren: () => import('src/app/pages/messages/messages.module').then(m => m.MessagesModule)
    }
];
