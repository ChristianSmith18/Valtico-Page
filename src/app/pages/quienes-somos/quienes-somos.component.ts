import { Component, OnInit } from '@angular/core';
import { QuienesSomos } from '@shared/models/quienes-somos.interface';
import { QuienesSomosService } from '@shared/services/quienes-somos.service';
import { DomSanitizerService } from '@shared/services/dom-sanitizer.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss'],
})
export class QuienesSomosComponent implements OnInit {
  public contenido: QuienesSomos;

  constructor(
    private _quienesSomos: QuienesSomosService,
    private _domSanitizer: DomSanitizerService
  ) {
    this._quienesSomos.getData().subscribe((contenido) => {
      this.contenido = contenido;
    });
  }

  ngOnInit(): void {}

  public applyDOMSanitizer(html: string) {
    return this._domSanitizer.applyDOMSanitizer(html);
  }
}
