import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Storage } from '@capacitor/Storage';
import { map } from 'rxjs/operators';
import { Persona } from '../../models/persona.model';

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
export class AuthService {

  persona!: any;

  constructor(
    public http: HttpClient
  ) { }

// ==================================================
//  Login
// ==================================================
  login( persona: Persona) {

  const url = environment.URL_SERVICIOS + '/login';

  console.log("pasa auth");

  return this.http.post(
    url,
    persona
    )
    .pipe(
          map(
            ( resp: any ) => {
              console.log("resp : ",resp);
                if (resp.mensaje === 'Error de credenciales') {
                  return false;
                }

    // console.log("pasa auth1");

    // this.setUserData.bind(this)

    // console.log("pasa auth 2");

    return true;
    }));

  }

  // ==================================================
//  Logout
// ==================================================
  logout() {
    // if (this.activeLogoutTimer) {
    //   clearTimeout(this.activeLogoutTimer);
    // }
    // this._user.next(null);
    // Storage.remove({ key: 'authData' });
  }

// ==================================================
// Guarda los datos del usuario en caso de que este autenticado
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

    console.log("user en auth service es : ", user);
    // this._user.next(user);
    // this.autoLogout(user.tokenDuration);

    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email
    );
  }

// ==================================================
// storeAuthData
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
