import { Component, OnInit, Input } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}

  get getType(): boolean {
    if (this.type === 'producto') {
      return true;
    }
    return false;
  }
}
