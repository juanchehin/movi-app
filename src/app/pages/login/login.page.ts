import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PersonasService } from '../../services/personas/personas.service';
import { Persona } from '../../models/persona.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(
    public alertController: AlertController,
    // public personaService: PersonaService,
    public router: Router,
    // public headerService: HeaderService
    ) { }
  ngOnInit() {
    // this.PersonasService.logout();
    // this.personaService.actualizaEstadoCliente();
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  ingresar(forma: NgForm) {

    if ( forma.invalid ) {
      return;
    }

    const persona = new Persona(
      forma.value.email,
      forma.value.password
    );

    // Llamada al servicio
    this.personaService.login(persona)
        .subscribe((resp: any) => {

          if ( resp === true) {
            this.router.navigate(['/principal']);
            return;
          }


      },
      ( error: any) => {
        console.log("Error",error);

          const alert = this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Alert',
            subHeader: 'Subtitle',
            message: 'This is an alert message.',
            buttons: ['OK']
          });

      }

      );

  }

}
