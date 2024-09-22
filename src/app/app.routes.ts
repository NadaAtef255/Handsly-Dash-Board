import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { EngineerListComponent } from './Pages/engineer-list/engineer-list.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    title: 'layout',
    children: [{ path: 'engineer', component: EngineerListComponent }],
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // { path: 'engineer/:id', component: EngineerDetailsComponent },
  { path: '**', component: PageNotFoundComponent },
];
