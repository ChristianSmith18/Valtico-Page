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
}
