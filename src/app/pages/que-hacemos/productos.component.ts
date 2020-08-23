import { Component, OnInit } from '@angular/core';
import { Producto } from '@shared/models/producto.interface';
import { ProductosService } from '@shared/services/productos.service';
import { DomSanitizerService } from '@shared/services/dom-sanitizer.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  public contenido: Producto;

  constructor(
    private _productos: ProductosService,
    private _domSanitizer: DomSanitizerService
  ) {
    this._productos.getData().subscribe((contenido) => {
      this.contenido = contenido;
    });
  }

  ngOnInit(): void {}

  public applyDOMSanitizer(html: string) {
    return this._domSanitizer.applyDOMSanitizer(html);
  }
}
