import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { TfaComponent } from 'src/app/pages/tfa/tfa.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'tfa/:userId', component: TfaComponent },
    { path: 'register', component: RegisterComponent }
];
