import { Component, OnInit } from '@angular/core';
import UIkit from 'uikit';

interface NavbarRoutes {
  name: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public navbarRoutes: NavbarRoutes[] = [
    { name: 'home', route: 'home', icon: 'fas fa-home' },
    { name: 'servicios', route: 'services', icon: 'fas fa-receipt' },
    { name: 'productos', route: 'products', icon: 'fas fa-store' },
    { name: 'quiénes somos', route: 'about', icon: 'fas fa-question-circle' },
    { name: 'clientes', route: 'clients', icon: 'fas fa-users' },
    { name: 'blog', route: 'blog', icon: 'fas fa-blog' },
    { name: 'eventos', route: 'events', icon: 'fas fa-calendar-week' },
  ];
  constructor() {}

  ngOnInit(): void {}

  closeMenu() {
    const menu = document.getElementById('offcanvas');
    UIkit.offcanvas(menu).hide();
  }
}
