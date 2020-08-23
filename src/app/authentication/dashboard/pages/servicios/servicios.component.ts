import { Component, OnInit } from '@angular/core';
import { Servicio } from '@shared/models/servicio.interface';
import { ServiciosService } from '@shared/services/servicios.service';
import { NgxSpinnerService } from 'ngx-spinner';
import UIkit from 'uikit';

import Compressor from 'compressorjs';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {
  public servicios: Servicio[];
  public currentIndex = 0;
  public editMode = false;

  public titleProduct: string;
  public base64textStringPrimary: string;
  public base64textStringSecondary: string;
  public largeDescription: string;

  constructor(
    private _servicios: ServiciosService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this._servicios.getAllServicios().subscribe(({ servicios }) => {
      this.servicios = servicios;
      this.spinner.hide();
    });

    setTimeout(() => this.spinner.hide(), 5000);
  }

  ngOnInit(): void {
    document.querySelector('#close-button').addEventListener('click', () => {
      if (this.editMode) {
        setTimeout(() => {
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
    servicio: Servicio,
    index: number
  ) {
    switch (event) {
      case 'Habilitar':
      case 'Deshabilitar':
        this._servicios
          .changeState(servicio.id, !servicio.enabled)
          .subscribe(() => {
            this.servicios[index].enabled = !servicio.enabled;
          });
        break;

      default:
        this.editMode = true;
        this.currentIndex = index;

        // Rellenado de Campos
        this.titleProduct = this.servicios[index].title;
        this.base64textStringPrimary = this.servicios[index].imgPrimary;
        this.base64textStringSecondary = this.servicios[index].imgSecondary;
        this.largeDescription = this.servicios[index].largeDescription;

        UIkit.modal(document.querySelector('#modal-full')).show();
        break;
    }
  }

  onUploadChange(evt: any, primary: boolean) {
    const file = evt.target.files[0] || null;
    const filename = file?.name;

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
                '#customFile2'
              ) as HTMLInputElement).select();

              document.querySelectorAll(
                'label.custom-file-label'
              )[0].innerHTML =
                (filename as string).length < 30
                  ? (filename as string)
                  : (filename as string).substring(0, 30) + '...';
            } else {
              this.base64textStringSecondary = base64data;

              (document.querySelector(
                '#exampleFormControlTextarea1'
              ) as HTMLInputElement).select();
              document.querySelectorAll(
                'label.custom-file-label'
              )[1].innerHTML =
                (filename as string).length < 30
                  ? (filename as string)
                  : (filename as string).substring(0, 30) + '...';
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
    this.spinner.show();
    const tempProducto: Servicio = {
      title: this.titleProduct,
      imgPrimary: this.base64textStringPrimary,
      imgSecondary: this.base64textStringSecondary,
      largeDescription: this.largeDescription,
      enabled: true,
    };

    if (this.editMode) {
      tempProducto.enabled = this.servicios[this.currentIndex].enabled;
      this._servicios
        .updateServicio(this.servicios[this.currentIndex].id, tempProducto)
        .subscribe(({ ok }) => {
          if (ok) {
            const id = this.servicios[this.currentIndex].id;
            this.servicios[this.currentIndex] = tempProducto;
            this.clearFields();
          }
        });
    } else {
      this._servicios
        .createServicio(tempProducto)
        .subscribe(({ servicio, ok }) => {
          if (ok) {
            this.servicios.unshift(servicio);
            this.clearFields();
          }
        });
    }
  }

  clearFields() {
    this.titleProduct = null;
    this.base64textStringPrimary = null;
    this.base64textStringSecondary = null;
    this.largeDescription = null;
    this.editMode = false;

    UIkit.modal(document.querySelector('#modal-full')).hide();
    this.spinner.hide();
  }
}
