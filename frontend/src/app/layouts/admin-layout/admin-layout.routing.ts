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
    },
    {
        path: "owners",
        loadChildren: () => import('src/app/pages/owners/owners.module').then(m => m.OwnersModule)
    },
    {
        path: "beneficiaries",
        loadChildren: () => import('src/app/pages/beneficiaries/beneficiaries.module').then(m => m.BeneficiariesModule)
    },
    {
        path: "drivers",
        loadChildren: () => import('src/app/pages/drivers/drivers.module').then(m => m.DriversModule)
    },
    {
        path: "administrators",
        loadChildren: () => import('src/app/pages/administrators/administrators.module').then(m => m.AdministratorsModule)
    },
    {
        path: "services",
        loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
    },
    {
        path: "sites",
        loadChildren: () => import('src/app/pages/sites/sites.module').then(m => m.SitesModule)
    },
    {
        path: "rooms",
        loadChildren: () => import('src/app/pages/rooms/rooms.module').then(m => m.RoomsModule)
    },
    {
        path: "burials",
        loadChildren: () => import('src/app/pages/burials/burials.module').then(m => m.BurialsModule)
    },
    {
        path: "cremations",
        loadChildren: () => import('src/app/pages/cremations/cremations.module').then(m => m.CremationsModule)
    },
    {
        path: "plans",
        loadChildren: () => import('src/app/pages/plans/plans.module').then(m => m.PlansModule)
    },
    {
        path: "service_plans",
        loadChildren: () => import('src/app/pages/service-plans/service-plans.module').then(m => m.ServicePlansModule)
    }

];
