import { Component } from '@angular/core';
import { QuienesSomosService } from '@shared/services/quienes-somos.service';
import { QuienesSomos } from '@shared/models/quienes-somos.interface';
import { DomSanitizerService } from '@shared/services/dom-sanitizer.service';

@Component({
  selector: 'app-quienes-somos',
  templateUrl: './quienes-somos.component.html',
  styleUrls: ['./quienes-somos.component.scss'],
})
export class QuienesSomosComponent {
  public contenido: QuienesSomos;
  public editMode = false;

  constructor(
    private _quienesSomos: QuienesSomosService,
    private _domSanitizer: DomSanitizerService
  ) {
    this._quienesSomos.getData().subscribe((contenido) => {
      this.contenido = contenido;
    });
  }

  setEditMode() {
    if (this.editMode) {
      const newQuienesSomos = this.contenido;

      newQuienesSomos.seccionQuienesSomos = {
        title: document
          .querySelectorAll('[contenteditable]')[0]
          .innerHTML.trim(),
        content: document
          .querySelectorAll('[contenteditable]')[1]
          .innerHTML.trim(),
      };

      newQuienesSomos.seccionNuestraHistoria = {
        title: document
          .querySelectorAll('[contenteditable]')[2]
          .innerHTML.trim(),
        content: document
          .querySelectorAll('[contenteditable]')[3]
          .innerHTML.trim(),
      };

      newQuienesSomos.seccionMisionVision = {
        title: document
          .querySelectorAll('[contenteditable]')[4]
          .innerHTML.trim(),
        content: document
          .querySelectorAll('[contenteditable]')[5]
          .innerHTML.trim(),
      };

      newQuienesSomos.seccionAlianzas = {
        title: document
          .querySelectorAll('[contenteditable]')[6]
          .innerHTML.trim(),
        content: document
          .querySelectorAll('[contenteditable]')[7]
          .innerHTML.trim(),
      };

      this._quienesSomos.updateData(newQuienesSomos).subscribe(({ ok }) => {
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
