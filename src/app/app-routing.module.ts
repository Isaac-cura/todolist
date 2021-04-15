import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  redirectTo: 'authorization',
  pathMatch: 'full'
}, {
  path: 'authorization',
  loadChildren: () => import('./pages/authorization/authorization.module').then(m => m.AuthorizationModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
