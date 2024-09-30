import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { LayoutComponent } from './Pages/layout/layout.component';

import { EngineerProfileComponent } from './Pages/engineer-profile/engineer-profile.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { EngineersListComponent } from './Pages/engineer-list/engineer-list.component';
import { VerifyRequestsComponent } from './Pages/verify-requests/verify-requests.component';
import { ClientListComponent } from './Pages/client-list/client-list.component';
import { ServiceListComponent } from './Pages/services/services.component';
import { ProposalsComponent } from './Pages/proposals/proposals.component';
import { ClientProfileComponent } from './Pages/client-profile/client-profile.component';
import { ServiceDetailsComponent } from './Pages/service-details/service-details.component';
import { LoginAlertComponent } from './Pages/login-alert/login-alert.component';
import { loginGuard } from './gaurds/login.guard';
import { preventLoginGuard } from './gaurds/prevent-login.guard';
import { PaymentStatusComponent } from './payment-status/payment-status.component';

export const routes: Routes = [
  { path: '', component: SignInComponent, canActivate: [preventLoginGuard] },
  {
    path: 'login-alert',
    component: LoginAlertComponent,
    canActivate: [preventLoginGuard],
  },

  {
    path: '',
    component: LayoutComponent,
    title: 'layout',
    canActivate: [loginGuard],
    children: [
      { path: 'engineer-list', component: EngineersListComponent },
      { path: 'verify', component: VerifyRequestsComponent },

      { path: 'profile/:id', component: EngineerProfileComponent },
      { path: 'clients', component: ClientListComponent },
      { path: 'clients/:id', component: ClientProfileComponent }, // Route for client profile

      { path: 'services', component: ServiceListComponent },
      { path: 'services/:id', component: ServiceDetailsComponent }, // Route for client profile
      { path: 'proposal', component: ProposalsComponent },

      { path: 'payment-status', component: PaymentStatusComponent }, // Route for PaymentStatus
    ],
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'engineer/:id', component: EngineerDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];
