import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AuthResponseData } from 'src/app/services/personas/personas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

// ==================================================
//  Proceso de LOGUEO
// ==================================================
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const persona = new Persona(
      form.value.email,
      form.value.password
    );

    console.log("pasa");

    this.authenticate(persona);
    form.reset();
  }

// ==================================================
//  Autenticar
// ==================================================
  authenticate(persona: Persona) {
    this.isLoading = true;

    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: any;

        if (this.isLogin) {
          authObs = this.authService.login(persona);
          console.log("authobs es : ",authObs);
        } else {
          this.showAlert("Error de login");
          // authObs = this.authService.signup(email, password);
        }

        authObs.subscribe(
          resData => {
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl("/principal");
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Could not sign you up, please try again.';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email address exists already!';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'E-Mail address could not be found.';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'This password is not correct.';
            }
            this.showAlert(message);
          }
        );
      });
  }

// ==================================================
//  showAlert
// ==================================================
  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message: message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
