import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { 
    path: '', 
    component: DashboardComponent,
    children: [{
      path: '',
      redirectTo: 'inicio',
      pathMatch: 'full'
    }, {
      path: 'inicio',
      loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
    },{ 
      path: 'usuarios', 
      loadChildren: () => import('../user/user.module').then(m => m.UserModule) 
    },{ 
      path: 'tareas', 
      loadChildren: () => import('../tasks/tasks.module').then(m => m.TasksModule) 
    }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
