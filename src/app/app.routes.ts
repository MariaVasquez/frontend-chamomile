import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './modules/user/register/register-user.component';
import { LoginComponent } from './modules/user/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'register',
    component: RegisterUserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
