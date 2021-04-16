import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './guards/login/authentication.guard'


const routes: Routes = [{
  path: '',
  redirectTo: 'authorization',
  pathMatch: 'full'
}, {
  path: 'authorization',
  loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule),
  canActivate: [AuthenticationGuard]
},
  { 
    path: 'dashboard', 
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthenticationGuard]
  },
  { 
    path: 'register', 
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule),
    canActivate: [AuthenticationGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
