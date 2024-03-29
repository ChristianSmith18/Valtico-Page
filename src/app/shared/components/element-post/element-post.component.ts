import { Component, Input, Output, EventEmitter } from '@angular/core';
import UIkit from 'uikit';
@Component({
  selector: 'app-element-post',
  templateUrl: './element-post.component.html',
  styleUrls: ['./element-post.component.scss'],
})
export class ElementPostComponent {
  @Input() tag = 'Blogs';
  @Input() frontImg =
    'https://www.sspc.org/wp-content/uploads/2019/05/no-image.png';
  @Input() title = 'Sin Título';
  @Input() text =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic accusantium corrupti ipsa blanditiis, pariatur consequuntur ut delectus corporis, ratione non debitis voluptates totam minus nesciunt officia.';
  @Input() date = '27 de Julio del 2020';
  @Input() route = '';
  @Input() isAdmin = false;
  @Input() maxWidth = 'unset';
  @Input() enabled = true;

  @Input() skeleton = false;

  @Output() dropdownClick = new EventEmitter<
    'Editar' | 'Habilitar' | 'Deshabilitar'
  >();

  constructor() {}

  dropdownEvent(event: 'Editar' | 'Habilitar' | 'Deshabilitar') {
    document.querySelectorAll('.my-dropdown').forEach((tag) => {
      UIkit.dropdown(tag).hide();
    });
    this.dropdownClick.emit(event);
  }
}
