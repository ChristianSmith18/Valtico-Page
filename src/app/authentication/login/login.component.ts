import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  constructor(
    private title: Title,
    private _authentication: AuthenticationService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.title.setTitle('Valtico Login');
  }

  ngOnInit(): void {}

  signIn() {
    this.spinner.show();
    this._authentication
      .signIn(this.email, this.password)
      .then(() => {
        this.spinner.hide();
        this.router.navigate(['valtico-admin/dashboard']);
      })
      .catch((err) => {
        this.spinner.hide();
        console.log(this.transformError(err));
      });
  }

  transformError(error: any): string {
    switch (error.code) {
      case 'auth/argument-error':
        return 'El correo y contraseña deben ser una cadena de texto.';
      case 'auth/invalid-email':
        return 'Debe ser un correo válido.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        return 'Usuario o contraseña incorrectos';
      default:
        return 'Error desconocido';
    }
  }

  resetPassword() {
    this._authentication.forgotPassword().then(console.log);
  }
}
