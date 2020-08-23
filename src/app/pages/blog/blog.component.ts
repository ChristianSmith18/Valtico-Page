import { Component, OnInit } from '@angular/core';
import { Blog } from '@shared/models/blog.interface';
import { BlogService } from '@shared/services/blog.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  public blogs: Blog[];
  public loaded = false;
  public noData = false;

  constructor(private _blog: BlogService) {}

  ngOnInit(): void {
    this._blog.getAllBlogs(false).subscribe((response) => {
      if (!response) {
        this.noData = true;
      } else {
        this.blogs = response.blogs;
      }
      this.loaded = true;
    });
  }

  transformRoute(route: string): string {
    return `/blog/${route}`;
  }
}
