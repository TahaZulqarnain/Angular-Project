import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from '../../core/guards/authguard';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [

      { path: '', redirectTo:'user/login', pathMatch: 'full' }, // Protect the login route
      {
        path: 'dashboard',
        loadChildren: () => import('./products/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard]
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule { }