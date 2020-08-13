import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-element-description',
  templateUrl: './element-description.component.html',
  styleUrls: ['./element-description.component.scss'],
})
export class ElementDescriptionComponent implements OnInit {
  @Input() title = 'Sin Título';
  @Input() content = 'Sin contenido';
  @Input() img = 'https://getuikit.com/docs/images/slider1.jpg';

  constructor() {}

  ngOnInit(): void {}
}
