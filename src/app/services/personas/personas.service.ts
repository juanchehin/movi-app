import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../../models/persona.model';
import { environment } from '../../../environments/environment';
import { Storage } from '@capacitor/Storage';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

// Declaro la data necesaria para autenticacion
export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private _user = new BehaviorSubject<User>(null);
  constructor(
    public http: HttpClient,
    public router: Router
  ) { }

// ==================================================
//        Obtiene una persona de la BD
// ==================================================

damePersona( termino: string ): any {

  console.log("pasa damePersona");

  const url = environment.URL_SERVICIOS + '/personas/' + termino;

  return this.http.get(url);

}
}
