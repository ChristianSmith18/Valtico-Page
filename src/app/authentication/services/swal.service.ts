import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}

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
}
