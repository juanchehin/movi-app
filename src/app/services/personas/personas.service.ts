import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../../models/persona.model';
import { environment } from '../../../environments/environment';
import { Storage } from '@ionic/Storage';
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
//        Logueo de la persona
// ==================================================
login(persona: Persona) {
  const url = environment.URL_SERVICIOS + '/login';

  return this.http
    .post(
      url,
      persona
    )
    .pipe(tap(this.setUserData.bind(this)));
}
// ==================================================
//   Guarda los datos del usuario en caso de que este autenticado
// ==================================================

private setUserData(userData: AuthResponseData) {
  const expirationTime = new Date(
    new Date().getTime() + +userData.expiresIn * 1000
  );

  const user = new User(
    userData.localId,
    userData.email,
    userData.idToken,
    expirationTime
  );

  this._user.next(user);
  // this.autoLogout(user.tokenDuration);
  this.storeAuthData(
    userData.localId,
    userData.idToken,
    expirationTime.toISOString(),
    userData.email
  );
}

// ==================================================
//   Logout y elimina data almacenada
// ==================================================
logout() {
  /*if (this.activeLogoutTimer) {
    clearTimeout(this.activeLogoutTimer);
  }
  this._user.next(null);
  Storage.remove({ key: 'authData' });*/
}

// ==================================================
//    Almacena la data en el localstorage
// ==================================================
private storeAuthData(
  userId: string,
  token: string,
  tokenExpirationDate: string,
  email: string
) {
  const data = JSON.stringify({
    userId: userId,
    token: token,
    tokenExpirationDate: tokenExpirationDate,
    email: email
  });
  Storage.set({ key: 'authData', value: data });
}
}
