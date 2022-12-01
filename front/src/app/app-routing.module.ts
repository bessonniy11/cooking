import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: 'blank',
    loadChildren: () => import('./pages/blank/page.module').then(m=>m.BlankPagePageModule)
  },
  {
    path: 'profile/main',
    loadChildren: () => import('./pages/profile/main/page.module').then(m=>m.ProfileMainPageModule)
  },
  {
    path: 'profile/settings',
    loadChildren: () => import('./pages/profile/settings/page.module').then(m=>m.ProfileSettingsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/page.module').then(m=>m.LoginPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./pages/auth/registration/page.module').then(m=>m.SignupComponentModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/page.module').then(m=>m.HomePageModule)
  },
  {
    path: 'dish/:id',
    loadChildren: () => import('./pages/dish/page.module').then(m=>m.DishPageModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./pages/create/page.module').then(m=>m.CreatePageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/auth/login/page.module').then(m=>m.LoginPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
