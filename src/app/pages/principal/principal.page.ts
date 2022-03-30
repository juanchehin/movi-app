import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonasService } from '../../services/personas/personas.service';


@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html'
})
export class PrincipalPage implements OnInit {
  public principal: string;
  date: any;
  persona: any;
  IdPersona: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public personaService: PersonasService
    ) { }

  ngOnInit() {
    // this.IdPersona = this.personaService.
    // this.cargarPersona();
    this.principal = this.activatedRoute.snapshot.paramMap.get('id');
  }

// ==================================================
// Carga de persona - Para mostrar nombre y apellido en el titulo
// ==================================================

cargarPersona() {

  // this.cargando = true;

  this.date = this.activatedRoute.snapshot.paramMap.get('id');

  this.personaService.damePersona( this.date )
             .subscribe( (resp: any) => {

              console.log("resp es : ",resp[0]);

              this.persona = resp[0];

              // this.cargando = false;

            });

}

}
