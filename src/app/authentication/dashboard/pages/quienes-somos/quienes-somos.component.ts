import { Component, OnInit } from '@angular/core';
import { QuienesSomosService } from '@shared/services/quienes-somos.service';
import { QuienesSomos } from '@shared/models/quienes-somos.interface';

@Component({
  selector: 'app-quienes-somos',
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
