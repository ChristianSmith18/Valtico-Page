import { Component, OnInit } from '@angular/core';
import {
  NavbarRoutes,
  NavRoutesService,
} from '@shared/services/nav-routes.service';
import { SwalService } from '@shared/services/swal.service';
import { AuthenticationService } from '@app/authentication/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public pages: NavbarRoutes[];

  constructor(
    private _navRoutes: NavRoutesService,
    private _authentication: AuthenticationService,
    private router: Router,
    private _swal: SwalService
  ) {
    this.pages = this._navRoutes.getNavbarRoutes;
  }

  ngOnInit(): void {
    document
      .querySelector('#options-menu > a')
      .addEventListener('click', () => {
        document.getElementById('options-menu').classList.toggle('menu-open');
      });
  }

  signOut() {
    this._swal.confirmSwal().then((result) => {
      if (result.value) {
        this._authentication.signOut().then(() => {
          this._swal.mixinSwal(
            'Se ha cerrado sesión correctamente!',
            'success',
            1500
          );
          this.router.navigate(['valtico-admin/login']);
        });
      }
    });
  }
}
