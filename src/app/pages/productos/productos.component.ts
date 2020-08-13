import { Component, OnInit } from '@angular/core';
import { Producto } from '@src/app/shared/models/producto.interface';
import { ProductosService } from '@src/app/shared/services/productos.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  public productos: Producto[];
  public currentIndex: number = null;

  constructor(private _productos: ProductosService) {
    this._productos
      .getAllProductosWithFilter()
      .subscribe(({ ok, productos }) => {
        if (ok) {
          this.productos = productos;
        }
      });
  }

  ngOnInit(): void {}

  clickOnBox(index: number) {
    this.currentIndex = index;
  }
}
