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

import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { EngineersListComponent } from './Pages/Engineers_list/list-groups.component';
import { EngineerProfileComponent } from './Pages/Engineer-profile/engineer-profile.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '', component: EngineersListComponent },
  { path: 'engineer/:id', component: EngineerProfileComponent },
  { path: '**', component: PageNotFoundComponent },
];
