import { Component, OnInit } from '@angular/core';
import { EmailService } from './../../services/email.service';
import { Email } from './../../models/email.interface';
import { SwalService } from './../../services/swal.service';
import UIkit from 'uikit';

@Component({
  selector: 'app-social-bar',
  templateUrl: './social-bar.component.html',
  styleUrls: ['./social-bar.component.scss'],
})
export class SocialBarComponent implements OnInit {
  public nameInput: string = null;
  public emailInput: string = null;
  public messageInput: string = null;
  public loader = false;

  constructor(private _email: EmailService, private _swal: SwalService) {}

  ngOnInit(): void {}

  sendEmail() {
    this.loader = true;
    const newEmail: Email = {
      name: this.nameInput,
      email: this.emailInput,
      message: this.messageInput,
    };

    this._email.sendEmail(newEmail).subscribe(
      ({ ok }) => {
        if (ok) {
          this._swal.mixinSwal('Mensaje enviado correctamente', 'success');
          this.loader = false;
          UIkit.modal(document.querySelector('#modal-contacto')).hide();
        } else {
          this._swal.mixinSwal('Ha ocurrido un error inesperado', 'error');
          this.loader = false;
        }
      },
      () => {
        this._swal.mixinSwal('Ha ocurrido un error inesperado', 'error');
        this.loader = false;
      }
    );
  }
}
