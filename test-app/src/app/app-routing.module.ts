import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../app/modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/external/user/user.module').then((m) => m.UserModule), //Lazy load design-system module
  },
  {
    path: '**',
    redirectTo: 'user/login',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
