import { Component } from '@angular/core';
import { ClientesService } from '@shared/services/clientes.service';
import { Cliente } from '@shared/models/cliente.interface';

import Compressor from 'compressorjs';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  public clients: Cliente[] = [];
  public currentIndex: number = null;
  public currenImg: string = null;
  public currenAdd: number = null;

  constructor(private _clientes: ClientesService) {
    this._clientes.getClientes(true).subscribe(({ clientes }) => {
      this.clients = clientes;
    });
  }

  changeImg(index: number) {
    if (
      index === this.currentIndex ||
      (index === this.currenAdd && this.currenAdd !== null)
    ) {
      (document.querySelector('#tempImg') as HTMLInputElement).click();
    }
  }

  editar(index: number) {
    this.currentIndex = index;
    this.currenImg = document.querySelectorAll('img')[
      this.currentIndex + 1
    ].src;
  }

  guardar(index: number) {
    const newCliente = this.clients[index];
    let key = true;
    const li = document.querySelectorAll('ul[uk-accordion] > li')[index];
    li.querySelectorAll('[contenteditable]').forEach((content) => {
      if (key) {
        newCliente.title = content.innerHTML.trim();
        key = false;
      }
      newCliente.description = content.innerHTML.trim();
    });
    newCliente.base64Img = this.currenImg;
    this._clientes
      .updateCliente(this.clients[index].id, this.clients[index])
      .subscribe(({ ok }) => {
        if (ok) {
          this.currentIndex = null;
          this.currenImg = null;
        }
      });
  }

  cambiarEstado(index: number, newState: boolean) {
    this._clientes
      .setStateCliente(this.clients[index].id, newState)
      .subscribe(({ ok }) => {
        if (ok) {
          this.clients[index].enabled = newState;
        }
      });
  }

  onUploadChange(evt: any) {
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

            document.querySelectorAll('img')[
              this.currentIndex + 1
            ].src = base64data;

            this.currenImg = base64data;
          };
        },
      });
    } else {
      (evt.target as HTMLInputElement).value = '';
    }
  }

  crearTarjeta() {
    if (this.currenAdd === null) {
      this.currenAdd = this.clients.length;

      this.clients.push({
        title: 'Nombre del Cliente',
        description:
          'Descripción breve acerca del cliente o algún contenido relacionado a él.',
        base64Img:
          'https://s3.amazonaws.com/sidramedicalsupply/site/sidra_1565678246_sidra-medical-supply.png',
        enabled: true,
      });

      this.currentIndex = this.clients.length - 1;
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 100);
    }
  }

  crearCliente(index: number) {
    const newCliente = this.clients[index];
    let key = true;
    const li = document.querySelectorAll('ul[uk-accordion] > li')[index];
    li.querySelectorAll('[contenteditable]').forEach((content) => {
      if (key) {
        newCliente.title = content.innerHTML.trim();
        key = false;
      }
      newCliente.description = content.innerHTML.trim();
    });
    newCliente.base64Img = this.currenImg;
    this._clientes.createCliente(this.clients[index]).subscribe(
      ({ ok, cliente }) => {
        if (ok) {
          this.clients[index].id = cliente.id;
          this.currenAdd = null;
          this.currentIndex = null;
          this.currenImg = null;
        }
      },
      (err) => {
        this.clients[index].base64Img =
          'https://s3.amazonaws.com/sidramedicalsupply/site/sidra_1565678246_sidra-medical-supply.png';
      }
    );
  }

  cancelarCliente() {
    this.clients.pop();
    this.currenAdd = null;
  }
}
