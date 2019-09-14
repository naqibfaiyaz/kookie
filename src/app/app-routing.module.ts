import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/user/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
  { path: 'my-cards/:id', loadChildren: './pages/my-cards/my-cards.module#MyCardsPageModule', canActivate: [AuthGuard] },
  { path: 'use-points/:id', loadChildren: './pages/use-points/use-points.module#UsePointsPageModule', canActivate: [AuthGuard] },
  { path: 'points-success-page', loadChildren: './pages/points-success-page/points-success-page.module#PointsSuccessPagePageModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
