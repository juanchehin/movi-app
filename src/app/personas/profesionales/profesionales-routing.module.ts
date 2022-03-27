import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfesionalesPage } from './profesionales.page';

const routes: Routes = [
  {
    path: '',
    component: ProfesionalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfesionalesPageRoutingModule {}
