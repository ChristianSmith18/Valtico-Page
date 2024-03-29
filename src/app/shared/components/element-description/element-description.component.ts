import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-element-description',
  templateUrl: './element-description.component.html',
  styleUrls: ['./element-description.component.scss'],
})
export class ElementDescriptionComponent {
  @Input() title = 'Sin Título';
  @Input() content = 'Sin contenido';
  @Input() img = 'https://getuikit.com/docs/images/slider1.jpg';
}
