import { Component } from '@angular/core';
import { ProductosService } from '@shared/services/productos.service';
import { Producto } from '@shared/models/producto.interface';
import { DomSanitizerService } from '@shared/services/dom-sanitizer.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent {
  public contenido: Producto;
  public editMode = false;

  constructor(
    private _producto: ProductosService,
    private _domSanitizer: DomSanitizerService
  ) {
    this._producto.getData().subscribe((contenido) => {
      this.contenido = contenido;
    });
  }

  setEditMode() {
    if (this.editMode) {
      const newQuienesSomos = this.contenido;

      newQuienesSomos.seccionQueHacemos = {
        title: document
          .querySelectorAll('[contenteditable]')[0]
          .innerHTML.trim(),
        content: document
          .querySelectorAll('[contenteditable]')[1]
          .innerHTML.trim(),
      };

      newQuienesSomos.seccionNuestraMetodologiaDeTrabajo = {
        title: document
          .querySelectorAll('[contenteditable]')[2]
          .innerHTML.trim(),
        content: document
          .querySelectorAll('[contenteditable]')[3]
          .innerHTML.trim(),
      };

      this._producto.updateData(newQuienesSomos).subscribe(({ ok }) => {
        if (ok) {
          this.editMode = false;
        }
      });
    } else {
      this.editMode = true;
    }
  }

  public applyDOMSanitizer(html: string) {
    return this._domSanitizer.applyDOMSanitizer(html);
  }
}
