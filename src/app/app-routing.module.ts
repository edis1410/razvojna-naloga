import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'settings',  loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
  { path: 'users',  loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
  { path: 'absences',  loadChildren: () => import('./absences/absences.module').then(m => m.AbsencesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
