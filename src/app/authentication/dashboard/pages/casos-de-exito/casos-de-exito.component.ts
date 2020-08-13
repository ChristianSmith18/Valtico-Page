import { Component, OnInit } from '@angular/core';
import { CasosDeExitoService } from '@shared/services/casos-de-exito.service';
import { CasoDeExito } from '@shared/models/caso-de-exito.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import UIkit from 'uikit';

import Compressor from 'compressorjs';

@Component({
  selector: 'app-casos-de-exito',
  templateUrl: './casos-de-exito.component.html',
  styleUrls: ['./casos-de-exito.component.scss'],
})
export class CasosDeExitoComponent implements OnInit {
  public casosDeExito: CasoDeExito[];
  public currentIndex = 0;
  public editMode = false;

  public title: string;
  public base64textStringPrimary: string;
  public base64textStringSecondary: string;
  public largeDescription: string;

  constructor(
    private _casosDeExito: CasosDeExitoService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this._casosDeExito.getAllCasosDeExito().subscribe(({ casosDeExito }) => {
      this.casosDeExito = casosDeExito;
      this.spinner.hide();
    });

    setTimeout(() => this.spinner.hide(), 5000);
  }

  ngOnInit(): void {
    document.querySelector('#close-button').addEventListener('click', () => {
      if (this.editMode) {
        setTimeout(() => {
          this.editMode = false;
          this.clearFields();
        }, 500);
      }
    });
  }

  clickOnBox(index: number) {
    this.currentIndex = index;
  }

  dropdownClick(
    event: 'Editar' | 'Habilitar' | 'Deshabilitar',
    casoDeExito: CasoDeExito,
    index: number
  ) {
    switch (event) {
      case 'Habilitar':
      case 'Deshabilitar':
        this._casosDeExito
          .changeState(casoDeExito.id, !casoDeExito.enabled)
          .subscribe(() => {
            this.casosDeExito[index].enabled = !casoDeExito.enabled;
          });
        break;

      default:
        this.editMode = true;
        this.currentIndex = index;

        // Rellenado de Campos
        this.title = this.casosDeExito[index].title;
        this.base64textStringPrimary = this.casosDeExito[index].imgPrimary;
        this.base64textStringSecondary = this.casosDeExito[index].imgSecondary;
        this.largeDescription = this.casosDeExito[index].largeDescription;

        // document.querySelector('#editor > .ql-editor').innerHTML = this.blogs[
        //   index
        // ].complete.article;

        UIkit.modal(document.querySelector('#modal-full')).show();
        break;
    }
  }

  onUploadChange(evt: any, primary: boolean) {
    const file = evt.target.files[0] || null;

    if (file) {
      if (
        file.type !== 'image/png' &&
        file.type !== 'image/jpg' &&
        file.type !== 'image/jpeg'
      ) {
        (evt.target as HTMLInputElement).value = '';
        return;
      }
      const reader = new FileReader();
      const compFile = new Compressor(file, {
        quality: 0.6,
        success: (result) => {
          reader.readAsDataURL(result);

          reader.onloadend = () => {
            const base64data = reader.result.toString();
            if (primary) {
              this.base64textStringPrimary = base64data;
              (document.querySelector(
                '#exampleFormControlDescription1'
              ) as HTMLInputElement).select();
            } else {
              this.base64textStringSecondary = base64data;
            }
          };
        },
      });
    } else {
      (evt.target as HTMLInputElement).value = '';
    }
  }

  openModal() {
    UIkit.modal(document.querySelector('#modal-full')).show();
  }

  createProducto() {
    const tempProducto: CasoDeExito = {
      title: this.title,
      imgPrimary: this.base64textStringPrimary,
      imgSecondary: this.base64textStringSecondary,
      largeDescription: this.largeDescription,
      enabled: true,
    };

    if (this.editMode) {
      tempProducto.enabled = this.casosDeExito[this.currentIndex].enabled;
      this._casosDeExito
        .updateCasoDeExito(
          this.casosDeExito[this.currentIndex].id,
          tempProducto
        )
        .subscribe(() => {
          this.editMode = false;
          this.clearFields();
          UIkit.modal(document.querySelector('#modal-full')).hide();
        });
    } else {
      this._casosDeExito
        .createCasoDeExito(tempProducto)
        .subscribe(({ casoDeExito }) => {
          this.casosDeExito.unshift(casoDeExito);
          this.editMode = false;
          this.clearFields();
          UIkit.modal(document.querySelector('#modal-full')).hide();
        });
    }
  }

  clearFields() {
    this.title = null;
    this.base64textStringPrimary = null;
    this.base64textStringSecondary = null;
    this.largeDescription = null;
    this.editMode = false;
  }
}
