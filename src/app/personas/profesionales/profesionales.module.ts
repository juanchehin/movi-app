import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfesionalesPageRoutingModule } from './profesionales-routing.module';

import { ProfesionalesPage } from './profesionales.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfesionalesPageRoutingModule
  ],
  declarations: [ProfesionalesPage]
})
export class ProfesionalesPageModule {}
