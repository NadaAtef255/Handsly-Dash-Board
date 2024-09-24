// import { RouterModule, Routes } from '@angular/router';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
// import { EngineersListComponent } from './Pages/Engineers_list/list-groups.component';
// import { EngineerProfileComponent } from './Pages/Engineer-profile/engineer-profile.component';

// export const routes: Routes = [
//   // { path: 'dashboard', component: DashboardComponent },

//   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
//   { path: 'engineerlist', component: EngineersListComponent },
//   { path: 'engineer/:id', component: EngineerProfileComponent },
//   { path: '**', component: PageNotFoundComponent },
// ];

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { LayoutComponent } from './Pages/layout/layout.component';
// import { EngineersListComponent } from './Pages/Engineers_list/list-groups.component';
// import { EngineerProfileComponent } from './Pages/Engineer-profile/engineer-profile.component';

import { EngineerProfileComponent } from './Pages/engineer-profile/engineer-profile.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { EngineersListComponent } from './Pages/engineer-list/engineer-list.component';
import { VerifyRequestsComponent } from './Pages/verify-requests/verify-requests.component';
import { ClientListComponent } from './Pages/client-list/client-list.component';
import { ServiceListComponent } from './Pages/services/services.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    title: 'layout',
    children: [
      { path: '', component: EngineersListComponent },
      { path: 'signin', component: SignInComponent },
      { path: 'verify', component: VerifyRequestsComponent },

      { path: 'profile/:id', component: EngineerProfileComponent },
      { path: 'client', component: ClientListComponent},
      { path: 'service', component: ServiceListComponent},



    ],
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'engineer/:id', component: EngineerDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];
