import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { LandingComponent } from 'src/app/pages/unauth/landing/landing.component';
import { AboutComponent } from 'src/app/pages/unauth/about/about.component';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { PqrsComponent } from 'src/app/pages/unauth/pqrs/pqrs.component';
import { TfaComponent } from 'src/app/pages/tfa/tfa.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { OfferedPlansComponent } from 'src/app/pages/auth/offered-plans/offered-plans.component';

export const AuthLayoutRoutes: Routes = [
    {
      path: '',
      component: LandingComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
    {
      path: 'pqrs',
      component: PqrsComponent,
    },
    {
      path: 'offered-plans',
      component: OfferedPlansComponent,
    },
    {
      path: 'tfa/:userId',
      component: TfaComponent
    },
    /* {
      path: 'pw-reset',
      component: PasswordResetComponent
    },
    {
      path: 'prompt-reset',
      component: PromptResetComponent
    }, */
    {
      path: 'user-profile',
      component: UserProfileComponent,
      canActivate: [AuthGuard]
    },
];
