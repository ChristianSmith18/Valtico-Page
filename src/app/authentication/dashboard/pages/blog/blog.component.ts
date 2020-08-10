import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '@shared/services/blog.service';
import { Subscription } from 'rxjs';
import { Blog } from '@shared/models/blog.interface';
import UIkit from 'uikit';

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

  constructor(private _blog: BlogService) {}

  ngOnInit(): void {
    this.blogSubscription = this._blog.getAllBlogs().subscribe((response) => {
      this.blogs = response.blogs;
    });

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

      if (portada) {
        reader.onload = this.handleReaderLoadedP.bind(this);
      } else {
        reader.onload = this.handleReaderLoadedC.bind(this);
      }
      reader.readAsBinaryString(file);
    } else {
      (evt.target as HTMLInputElement).value = '';
    }
  }

  handleReaderLoadedP(e) {
    this.base64textStringPortada =
      'data:image/png;base64,' + btoa(e.target.result);
  }

  handleReaderLoadedC(e) {
    this.base64textStringContenido =
      'data:image/png;base64,' + btoa(e.target.result);
  }

  inner(event: HTMLDivElement) {
    this.content = event.innerHTML;
  }

  createBlog() {
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
        this._blog
          .updateBlog(this.blogs[this.index].id, blog)
          .subscribe((e) => {
            this.blogs[this.index] = blog;
            this.index = null;
            UIkit.modal(document.querySelector('#modal-full')).hide();
          });
      }
    } else {
      this._blog.createBlog(blog).subscribe((e) => {
        this.blogs.push(e);
        this.clearModal();
        UIkit.modal(document.querySelector('#modal-full')).hide();
      });
    }
  }

  dropdownClick(
    event: 'Editar' | 'Habilitar' | 'Deshabilitar',
    blog: Blog,
    index: number
  ) {
    switch (event) {
      case 'Habilitar':
      case 'Deshabilitar':
        this._blog.changeState(blog.id, !blog.enabled).subscribe(() => {
          this.blogs[index].enabled = !blog.enabled;
        });
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
    console.log(index);
  }

  clearModal() {
    this.title = '';
    this.base64textStringPortada = null;
    this.base64textStringContenido = null;
    this.shortDescription = '';
    document.querySelector('#editor > .ql-editor').innerHTML = '';
  }
}
