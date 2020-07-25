import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public show = false;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.show = this.verifyPath(window.location.pathname, 'home');
    });
  }

  ngOnInit() {}

  verifyPath(rootPath: string, ...paths: string[]) {
    for (const path of paths) {
      if (rootPath === `/${path}`) {
        return false;
      }
    }
    return true;
  }
}
