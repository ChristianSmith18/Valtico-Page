import { Component, OnInit } from '@angular/core';
import { QuienesSomos } from '@src/app/shared/models/quienes-somos.interface';
import { QuienesSomosService } from '@src/app/shared/services/quienes-somos.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss'],
})
export class QuienesSomosComponent implements OnInit {
  public contenido: QuienesSomos;

  constructor(private _quienesSomos: QuienesSomosService) {
    this._quienesSomos.getData().subscribe((contenido) => {
      this.contenido = contenido;
    });
  }

  ngOnInit(): void {}
}
