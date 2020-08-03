import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Router, ActivationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  providers: [TitleCasePipe],
})
export class BreadcrumbComponent implements OnDestroy {
  public title: string;
  public titleSubscription: Subscription;

  constructor(
    private router: Router,
    private titleDoc: Title,
    private titleCase: TitleCasePipe
  ) {
    this.titleSubscription = this.getRouteData().subscribe(({ title }) => {
      this.titleDoc.setTitle(`Dashboard - ${this.titleCase.transform(title)}`);
      this.title = title;
    });
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }

  getRouteData() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild == null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
