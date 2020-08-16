import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventosService } from '@shared/services/eventos.service';
import { Subscription } from 'rxjs';
import { Evento } from '@shared/models/evento.interface';
import { SwalService } from '@shared/services/swal.service';
import UIkit from 'uikit';
import { NgxSpinnerService } from 'ngx-spinner';

import Compressor from 'compressorjs';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit, OnDestroy {
  public eventos: Evento[] = [];
  private eventoSubscription: Subscription;

  public title = '';
  public base64textStringPortada: string = null;
  public base64textStringContenido: string = null;
  public shortDescription = '';
  public content: any;

  public editMode = false;
  public index = null;

  constructor(
    private _evento: EventosService,
    private spinner: NgxSpinnerService,
    private _swal: SwalService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.eventoSubscription = this._evento.getAllEventos(true).subscribe(
      (response) => {
        this.eventos = response.events;
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        this.readErrorCodes(err.status);
      }
    );

    // Para agregar el effecto de slide hacia abajo al cerrar el modal
    document
      .querySelector('#modal-full button')
      .addEventListener('click', () => {
        document
          .querySelector('#modal-full')
          .classList.add('animation-slide-out');
        setTimeout(() => {
          document
            .querySelector('#modal-full')
            .classList.remove('animation-slide-out');
        }, 1000);
      });

    document.querySelector('#close-button').addEventListener('click', () => {
      if (this.editMode) {
        this.editMode = false;
        this.clearModal();
      }
    });

    this.closeSpinner();
  }

  ngOnDestroy(): void {
    this.eventoSubscription.unsubscribe();
  }

  onUploadChange(evt: any, portada: boolean) {
    const file = evt.target.files[0] || null;
    const filename = file.name;

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
            if (portada) {
              this.base64textStringPortada = base64data;

              (document.getElementById(
                'l-img-p'
              ) as HTMLLabelElement).innerText = this.textFormat(filename);

              (document.querySelector(
                '#exampleFormControlDescription1'
              ) as HTMLInputElement).select();
            } else {
              this.base64textStringContenido = base64data;

              (document.getElementById(
                'l-img-e'
              ) as HTMLLabelElement).innerText = this.textFormat(filename);
            }
          };
        },
      });
    } else {
      (evt.target as HTMLInputElement).value = '';
    }
  }

  textFormat(text: string): string {
    if (text.length < 30) {
      return text;
    }
    return text.substring(0, 30).trim() + '...';
  }

  inner(event: HTMLDivElement) {
    this.content = event.innerHTML;
  }

  createEvento() {
    this.spinner.show();
    const evento: Evento = {
      title: this.title,
      front: {
        imgFront: this.base64textStringPortada,
        shortDescription: this.shortDescription,
      },
      complete: {
        imgTop: this.base64textStringContenido,
        article: this.content,
      },
      enabled: true,
    };
    if (this.editMode) {
      if (this.index !== null) {
        evento.enabled = this.eventos[this.index].enabled;
        this._evento
          .updateEvento(this.eventos[this.index].id, evento)
          .subscribe(
            (e) => {
              this.eventos[this.index] = evento;
              this.index = null;
              UIkit.modal(document.querySelector('#modal-full')).hide();
              this.spinner.hide();
              this.clearModal();
            },
            (err) => {
              this.readErrorCodes(err.status);

              this.spinner.hide();
            }
          );
      }
    } else {
      this._evento.createEvento(evento).subscribe(
        (e) => {
          this.eventos.push(e);
          this.clearModal();
          UIkit.modal(document.querySelector('#modal-full')).hide();
          this.spinner.hide();
          this.clearModal();
        },
        (err) => {
          this.readErrorCodes(err.status);
          this.spinner.hide();
        }
      );
    }
    this.closeSpinner();
  }

  dropdownClick(
    event: 'Editar' | 'Habilitar' | 'Deshabilitar',
    evento: Evento,
    index: number
  ) {
    switch (event) {
      case 'Habilitar':
      case 'Deshabilitar':
        this._evento.changeState(evento.id, !evento.enabled).subscribe(
          () => {
            this.eventos[index].enabled = !evento.enabled;
          },
          (err) => {
            this.readErrorCodes(err.status);
          }
        );
        break;

      default:
        this.editMode = true;

        // Rellenado de Campos
        this.title = this.eventos[index].title;
        this.base64textStringPortada = this.eventos[index].front.imgFront;
        this.base64textStringContenido = this.eventos[index].complete.imgTop;
        this.shortDescription = this.eventos[index].front.shortDescription;
        this.index = index;

        document.querySelector('#editor > .ql-editor').innerHTML = this.eventos[
          index
        ].complete.article;

        UIkit.modal(document.querySelector('#modal-full')).show();
        break;
    }
  }

  clearModal() {
    this.title = '';
    this.base64textStringPortada = null;
    this.base64textStringContenido = null;
    this.shortDescription = '';
    document.querySelector('#editor > .ql-editor').innerHTML = '';
  }

  closeSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 5000);
  }

  readErrorCodes(code: number) {
    switch (code) {
      case 0:
        this._swal.mixinSwal('Error de conexión.', 'error');
        break;
      case 400:
        this._swal.mixinSwal('Debe rellenar todos los campos.', 'error');
        break;
      case 401:
        this._swal.mixinSwal(
          'No estás autenticado, por favor cierre sesión y vuelva a intentarlo.',
          'error',
          3000,
          true,
          'Salir'
        );
        break;
      default:
        break;
    }
  }

  openModal() {
    UIkit.modal(document.querySelector('#modal-full')).show();
  }
}
