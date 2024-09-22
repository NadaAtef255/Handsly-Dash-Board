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
import { TestComponent } from './test/test.component';
import { EngineersListComponent } from './Pages/engineer-list/engineer-list.component';
import { Test2Component } from './test2/test2.component';
import { EngineerProfileComponent } from './Pages/engineer-profile/engineer-profile.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    title: 'layout',
    children: [
      { path: '', component: EngineersListComponent },
      { path: 'profile/:id', component: EngineerProfileComponent },
    ],
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'engineer/:id', component: EngineerDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];
