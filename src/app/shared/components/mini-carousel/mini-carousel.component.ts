import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Servicio } from './../../models/servicio.interface';

@Component({
  selector: 'app-mini-carousel',
  templateUrl: './mini-carousel.component.html',
  styleUrls: ['./mini-carousel.component.scss'],
})
export class MiniCarouselComponent {
  @Input() servicios: Servicio[];

  @Output() clickOnBoxItem = new EventEmitter<number>();

  constructor() {}

  clickOnBox(index: number) {
    this.clickOnBoxItem.emit(index);
  }
}
