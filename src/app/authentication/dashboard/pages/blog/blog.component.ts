import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlogService } from '@shared/services/blog.service';
import { Subscription } from 'rxjs';
import { Blog } from '@shared/models/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogs: Blog;
  private blogSubscription: Subscription;

  public title = '';
  public base64textStringPortada: string = null;
  public base64textStringContenido: string = null;
  public shortDescription = '';
  public content: any;

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
    const newBlog: Blog = {
      title: this.title,
      front: {
        imgFront: this.base64textStringPortada,
        shortDescription: this.shortDescription,
      },
      complete: {
        imgTop: this.base64textStringContenido,
        article: this.content,
      },
    };
    this._blog.createBlog(newBlog).subscribe(console.log);
  }
}
