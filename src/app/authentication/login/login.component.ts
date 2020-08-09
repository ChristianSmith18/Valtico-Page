import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwalService } from '../services/swal.service';

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
    private spinner: NgxSpinnerService,
    private _swal: SwalService
  ) {
    this.title.setTitle('Valtico Login');
  }

  ngOnInit(): void {}

  signIn(): void {
    this.spinner.show();
    this._authentication
      .signIn(this.email, this.password)
      .then((auth) => {
        const token = this._authentication
          .createToken(auth.user.email)
          .subscribe((backend) => {
            if (backend.ok) {
              localStorage.setItem('_token', backend.token);
              this.spinner.hide();
              this._swal.mixinSwal(
                'Se ha iniciado sesión correctamente!',
                'success'
              );
              this.router.navigate(['valtico-admin/dashboard']);
              token.unsubscribe();
            } else {
              this.transformError('');
              token.unsubscribe();
            }
          });
      })
      .catch((err) => {
        this.spinner.hide();
        this.transformError(err);
      });
  }

  transformError(error: any): void {
    switch (error.code) {
      case 'auth/argument-error':
        this._swal.mixinSwal(
          'El correo y contraseña deben ser una cadena de texto.',
          'info'
        );
        break;
      case 'auth/invalid-email':
        this._swal.mixinSwal('Debe ser un correo válido.', 'info');
        break;
      case 'auth/user-not-found':
      case 'auth/wrong-password':
        this._swal.mixinSwal('Usuario o contraseña incorrectos', 'info');
        break;
      default:
        this._swal.mixinSwal('Error desconocido.', 'error');
        break;
    }
  }

  resetPassword(): void {
    this._authentication
      .forgotPassword()
      .then(() => {
        this._swal.mixinSwal(
          'Se ha enviado un link a tu correo para reestablecer la contraseña.',
          'success'
        );
      })
      .catch((err) => {
        this._swal.mixinSwal(err, 'error');
      });
  }
}
