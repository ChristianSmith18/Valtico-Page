import { Component, OnInit } from '@angular/core';
import { NavbarRoutes } from '@src/app/shared/components/navbar/navbar.component';
import { SwalService } from '../../../services/swal.service';
import { AuthenticationService } from '@src/app/authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public pages: NavbarRoutes[] = [
    { name: 'home', route: 'home', icon: 'fas fa-home' },
    { name: 'productos', route: 'products', icon: 'fas fa-store' },
    { name: 'servicios', route: 'services', icon: 'fas fa-receipt' },
    { name: 'quiénes somos', route: 'about', icon: 'fas fa-question-circle' },
    {
      name: 'clientes',
      route: 'clients',
      icon: 'fas fa-users',
      child: [
        { name: 'casos de éxito', route: 'success', icon: 'fas fa-thumbs-up' },
      ],
    },
    { name: 'blog', route: 'blog', icon: 'fas fa-blog' },
    { name: 'eventos', route: 'events', icon: 'fas fa-calendar-week' },
  ];

  constructor(
    private _authentication: AuthenticationService,
    private router: Router,
    private _swal: SwalService
  ) {}

  ngOnInit(): void {}

  signOut() {
    this._swal.confirmSwal().then((result) => {
      if (result.value) {
        this._authentication.signOut().then(() => {
          this.router.navigate(['valtico-admin/login']);
        });
      }
    });
  }
}
