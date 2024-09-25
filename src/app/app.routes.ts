

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { TestComponent } from './test/test.component';
import { EngineersListComponent } from './Pages/engineer-list/engineer-list.component';
import { Test2Component } from './test2/test2.component';
import { EngineerProfileComponent } from './Pages/engineer-profile/engineer-profile.component';
import { ClientListComponent } from './Pages/client-list/client-list.component';
import { ServiceListComponent } from './Pages/services/services.component';
import { ProposalsComponent } from './Pages/proposals/proposals.component';
import { ClientProfileComponent } from './Pages/client-profile/client-profile.component';
import { ServiceDetailsComponent } from './Pages/service-details/service-details.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    title: 'layout',
    children: [
      { path: '', component: EngineersListComponent },
      { path: 'profile/:id', component: EngineerProfileComponent },
      { path: 'clients', component: ClientListComponent},
      { path: 'clients/:id', component: ClientProfileComponent }, // Route for client profile

      { path: 'services', component: ServiceListComponent},
      { path: 'services/:id', component: ServiceDetailsComponent }, // Route for client profile
      { path: 'proposal', component: ProposalsComponent},



    ],
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'engineer/:id', component: EngineerDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];
