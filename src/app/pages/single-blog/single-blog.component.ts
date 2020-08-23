import { DomSanitizerService } from './../../shared/services/dom-sanitizer.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '@shared/services/blog.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.scss'],
})
export class SingleBlogComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public imgBanner: string;
  public content: any;

  public showBgData = true;

  constructor(
    private _blog: BlogService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private _domSanitizer: DomSanitizerService
  ) {
    this._blog.getOneBlog(window.location.pathname.split('/')[2]).subscribe(
      ({ blog }) => {
        if (!blog.enabled) {
          this.router.navigate(['home']);
        }
        this.title = blog.title;
        this.subtitle = blog.front.shortDescription;
        this.imgBanner = blog.complete.imgTop;

        document.querySelector('#editor-container').innerHTML =
          this._domSanitizer.applyDOMSanitizer(blog.complete.article) + '';
        this.showBgData = false;
        this.spinner.hide();
      },
      (err) => {
        console.clear();
        this.router.navigate(['home']);
      }
    );
    setTimeout(() => this.spinner.hide(), 5000);
  }

  ngOnInit(): void {
    this.spinner.show();
  }
}
