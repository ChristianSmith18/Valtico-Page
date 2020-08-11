import { Router } from '@angular/router';
import { AuthenticationService } from '@src/app/authentication/services/authentication.service';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor(
    private _authentication: AuthenticationService,
    private router: Router
  ) {}

  confirmSwal() {
    return Swal.fire({
      title: '¿Estás seguro que deseas salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#007bff',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
    });
  }

  mixinSwal(
    title: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question',
    timer: number = 3000,
    showConfirmButton: boolean = false,
    confirmButtonText?: string
  ) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon,
      title,
      showConfirmButton,
      confirmButtonText,
    }).then((res) => {
      if (res.value) {
        this._authentication.signOut().then(() => {
          this.router.navigate(['valtico-admin/login']);
        });
      }
    });
  }
}
