import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'asistencias',
    loadChildren: () => import('./pages/asistencias/asistencias.module').then( m => m.AsistenciasPageModule)
  },
  {
    path: 'caja',
    loadChildren: () => import('./pages/caja/caja.module').then( m => m.CajaPageModule)
  },
  {
    path: 'planes',
    loadChildren: () => import('./pages/planes/planes.module').then( m => m.PlanesPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./pages/principal/principal.module').then( m => m.PrincipalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
