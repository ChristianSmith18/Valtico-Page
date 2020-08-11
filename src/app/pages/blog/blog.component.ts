import { BlogService } from '@shared/services/blog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Blog } from '@src/app/shared/models/blog.interface';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit, OnDestroy {
  public blogs: Blog[];
  public loaded = false;
  public noData = false;
  private blogSubscription: Subscription;

  constructor(private _blog: BlogService) {}

  ngOnInit(): void {
    this.blogSubscription = this._blog
      .getAllBlogs(false)
      .subscribe((response) => {
        if (!response) {
          this.noData = true;
        } else {
          this.blogs = response.blogs;
        }
        this.loaded = true;
      });
  }

  ngOnDestroy(): void {
    this.blogSubscription.unsubscribe();
  }

  transformRoute(route: string): string {
    return `/blog/${route}`;
  }
}
