import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '@shared/services/blog.service';
import { Subscription } from 'rxjs';
import { Blog } from '@shared/models/blog.interface';
import { SwalService } from '@shared/services/swal.service';
import UIkit from 'uikit';
import { NgxSpinnerService } from 'ngx-spinner';

import Compressor from 'compressorjs';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogs: Blog[];
  private blogSubscription: Subscription;

  public title = '';
  public base64textStringPortada: string = null;
  public base64textStringContenido: string = null;
  public shortDescription = '';
  public content: any;

  public editMode = false;
  public index = null;

  constructor(
    private _blog: BlogService,
    private spinner: NgxSpinnerService,
    private _swal: SwalService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.blogSubscription = this._blog.getAllBlogs(true).subscribe(
      (response) => {
        this.blogs = response.blogs;
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
    this.blogSubscription.unsubscribe();
  }

  onUploadChange(evt: any, portada: boolean) {
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
            if (portada) {
              this.base64textStringPortada = base64data;
              (document.querySelector(
                '#exampleFormControlDescription1'
              ) as HTMLInputElement).select();
            } else {
              this.base64textStringContenido = base64data;
            }
          };
        },
      });
    } else {
      (evt.target as HTMLInputElement).value = '';
    }
  }

  inner(event: HTMLDivElement) {
    this.content = event.innerHTML;
  }

  createBlog() {
    this.spinner.show();
    const blog: Blog = {
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
        blog.enabled = this.blogs[this.index].enabled;
        this._blog.updateBlog(this.blogs[this.index].id, blog).subscribe(
          (e) => {
            this.blogs[this.index] = blog;
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
      this._blog.createBlog(blog).subscribe(
        (e) => {
          this.blogs.push(e);
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
    blog: Blog,
    index: number
  ) {
    switch (event) {
      case 'Habilitar':
      case 'Deshabilitar':
        this._blog.changeState(blog.id, !blog.enabled).subscribe(
          () => {
            this.blogs[index].enabled = !blog.enabled;
          },
          (err) => {
            this.readErrorCodes(err.status);
          }
        );
        break;

      default:
        this.editMode = true;

        // Rellenado de Campos
        this.title = this.blogs[index].title;
        this.base64textStringPortada = this.blogs[index].front.imgFront;
        this.base64textStringContenido = this.blogs[index].complete.imgTop;
        this.shortDescription = this.blogs[index].front.shortDescription;
        this.index = index;

        document.querySelector('#editor > .ql-editor').innerHTML = this.blogs[
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
}
