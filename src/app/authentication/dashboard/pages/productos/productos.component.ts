import { Component, OnInit } from '@angular/core';
import { ProductosService } from '@shared/services/productos.service';
import { Producto } from '@shared/models/producto.interface';
import UIkit from 'uikit';
import { NgxSpinnerService } from 'ngx-spinner';

import Compressor from 'compressorjs';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  public productos: Producto[];
  public currentIndex = 0;
  public editMode = false;

  public titleProduct: string;
  public base64textStringPrimary: string;
  public base64textStringSecondary: string;
  public shortDescription: string;
  public largeDescription: string;

  constructor(
    private _productos: ProductosService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this._productos.getAllProductos().subscribe(({ ok, productos }) => {
      if (ok) {
        this.productos = productos;
        this.spinner.hide();
      }
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
    producto: Producto,
    index: number
  ) {
    switch (event) {
      case 'Habilitar':
      case 'Deshabilitar':
        this._productos
          .changeState(producto.id, !producto.enabled)
          .subscribe(() => {
            this.productos[index].enabled = !producto.enabled;
          });
        break;

      default:
        this.editMode = true;
        this.currentIndex = index;

        // Rellenado de Campos
        this.titleProduct = this.productos[index].title;
        this.base64textStringPrimary = this.productos[index].imgPrimary;
        this.base64textStringSecondary = this.productos[index].imgSecondary;
        this.shortDescription = this.productos[index].shortDescription;
        this.largeDescription = this.productos[index].largeDescription;

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
    const tempProducto: Producto = {
      title: this.titleProduct,
      imgPrimary: this.base64textStringPrimary,
      shortDescription: this.shortDescription,
      imgSecondary: this.base64textStringSecondary,
      largeDescription: this.largeDescription,
      enabled: true,
    };

    if (this.editMode) {
      tempProducto.enabled = this.productos[this.currentIndex].enabled;
      this._productos
        .updateProducto(this.productos[this.currentIndex].id, tempProducto)
        .subscribe(() => {
          this.editMode = false;
          UIkit.modal(document.querySelector('#modal-full')).hide();
        });
    } else {
      this._productos.createProducto(tempProducto).subscribe(({ producto }) => {
        this.productos.unshift(producto);
        this.editMode = false;
        UIkit.modal(document.querySelector('#modal-full')).hide();
      });
    }
  }

  clearFields() {
    this.titleProduct = null;
    this.base64textStringPrimary = null;
    this.base64textStringSecondary = null;
    this.shortDescription = null;
    this.largeDescription = null;
  }
}
