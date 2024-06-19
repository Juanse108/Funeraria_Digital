import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', canActivate: [AuthGuard], component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    {
        path: "users",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/users/users.module').then(m => m.UsersModule)
    },
    {
        path: "roles",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/roles/roles.module').then(m => m.RolesModule)
    },
    {
        path: "permissions",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/permissions/permissions.module').then(m => m.PermissionsModule)
    },
    {
        path: "role_permissions",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/role-permissions/role-permissions.module').then(m => m.RolePermissionsModule)
    },
    {
        path: "customers",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/customers/customers.module').then(m => m.CustomersModule)
    },
    {
        path: "subscriptions",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule)
    },
    {
        path: "service_executions",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/service-executions/service-executions.module').then(m => m.ServiceExecutionsModule)
    },
    {
        path: "payments",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/payments/payments.module').then(m => m.PaymentsModule)
    },
    {
        path: "comment_ratings",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/comment-ratings/comment-ratings.module').then(m => m.CommentRatingsModule)
    },
    {
        path: "chats",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/chats/chats.module').then(m => m.ChatsModule)
    },
    {
        path: "relocations",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/relocations/relocations.module').then(m => m.RelocationsModule)
    },
    {
        path: "messages",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/messages/messages.module').then(m => m.MessagesModule)
    },
    {
        path: "owners",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/owners/owners.module').then(m => m.OwnersModule)
    },
    {
        path: "beneficiaries",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/beneficiaries/beneficiaries.module').then(m => m.BeneficiariesModule)
    },
    {
        path: "drivers",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/drivers/drivers.module').then(m => m.DriversModule)
    },
    {
        path: "administrators",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/administrators/administrators.module').then(m => m.AdministratorsModule)
    },
    {
        path: "services",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
    },
    {
        path: "sites",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/sites/sites.module').then(m => m.SitesModule)
    },
    {
        path: "rooms",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/rooms/rooms.module').then(m => m.RoomsModule)
    },
    {
        path: "burials",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/burials/burials.module').then(m => m.BurialsModule)
    },
    {
        path: "cremations",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/cremations/cremations.module').then(m => m.CremationsModule)
    },
    {
        path: "plans",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/plans/plans.module').then(m => m.PlansModule)
    },
    {
        path: "service_plans",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/service-plans/service-plans.module').then(m => m.ServicePlansModule)
    },
    {
        path: "servicios_musicales",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/musics/musics.module').then(m => m.MusicsModule)
    },
    {
        path: "tipos_musica",
        canActivate: [AuthGuard],
        loadChildren: () => import('src/app/pages/types/types.module').then(m => m.TypesModule)
    },
    

];
