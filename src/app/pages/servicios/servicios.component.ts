import { ServiciosService } from '@shared/services/servicios.service';
import { Servicio } from './../../shared/models/servicio.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.scss'],
})
export class ServiciosComponent implements OnInit {
  public servicios: Servicio[];
  public currentIndex: number = null;

  constructor(private _servicios: ServiciosService) {
    this._servicios
      .getAllServiciosWithFilter()
      .subscribe(({ ok, servicios }) => {
        if (ok) {
          this.servicios = servicios;
        }
      });
  }

  ngOnInit(): void {}

  clickOnBox(index: number) {
    this.currentIndex = index;
  }
}
