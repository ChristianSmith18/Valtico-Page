import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import UIkit from 'uikit';

@Component({
  selector: 'app-element-box',
  templateUrl: './element-box.component.html',
  styleUrls: ['./element-box.component.scss'],
})
export class ElementBoxComponent implements OnInit {
  @Input() type: 'servicio' | 'producto' | 'caso de exito' = 'producto';
  @Input() title = 'Sin título';
  @Input() description =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.';
  @Input() imgStatic = 'https://getuikit.com/docs/images/dark.jpg';
  @Input() imgHover = 'https://getuikit.com/docs/images/light.jpg';
  @Input() isAdmin = false;
  @Input() enabled = true;

  @Output() dropdownClick = new EventEmitter<
    'Editar' | 'Habilitar' | 'Deshabilitar'
  >();

  constructor() {}

  ngOnInit(): void {}

  get getType(): boolean {
    if (this.type === 'producto') {
      return true;
    }
    return false;
  }

  dropdownEvent(event: 'Editar' | 'Habilitar' | 'Deshabilitar') {
    document.querySelectorAll('.my-dropdown').forEach((tag) => {
      UIkit.dropdown(tag).hide();
    });
    this.dropdownClick.emit(event);
  }
}
