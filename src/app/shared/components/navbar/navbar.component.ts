import { Component, OnInit } from '@angular/core';
import {
  NavRoutesService,
  NavbarRoutes,
} from './../../services/nav-routes.service';
import UIkit from 'uikit';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public navbarRoutes: NavbarRoutes[];

  constructor(private _navRoutes: NavRoutesService) {
    this.navbarRoutes = this._navRoutes.getNavbarRoutes;
  }

  ngOnInit(): void {}

  closeMenu() {
    const menu = document.getElementById('offcanvas');
    UIkit.offcanvas(menu).hide();
  }
}
