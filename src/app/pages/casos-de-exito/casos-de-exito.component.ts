import { CasosDeExitoService } from '@shared/services/casos-de-exito.service';
import { CasoDeExito } from '@shared/models/caso-de-exito.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-casos-de-exito',
  templateUrl: './casos-de-exito.component.html',
  styleUrls: ['./casos-de-exito.component.scss'],
})
export class CasosDeExitoComponent implements OnInit {
  public casosDeExito: CasoDeExito[];
  public currentIndex: number = null;

  constructor(private _casosDeExito: CasosDeExitoService) {
    this._casosDeExito
      .getAllCasosDeExitoWithFilter()
      .subscribe(({ ok, casosDeExito }) => {
        if (ok) {
          this.casosDeExito = casosDeExito;
        }
      });
  }

  ngOnInit(): void {}

  clickOnBox(index: number) {
    this.currentIndex = index;
  }
}
