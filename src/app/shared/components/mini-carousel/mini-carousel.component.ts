import { Servicio } from './../../models/servicio.interface';
import { Producto } from '@shared/models/producto.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mini-carousel',
  templateUrl: './mini-carousel.component.html',
  styleUrls: ['./mini-carousel.component.scss'],
})
export class MiniCarouselComponent implements OnInit {
  @Input() title = 'Sin título';
  @Input() productos: Producto[] = null;
  @Input() servicios: Servicio[] = null;

  @Output() clickOnBoxItem = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  clickOnBox(index: number) {
    this.clickOnBoxItem.emit(index);
  }
}
