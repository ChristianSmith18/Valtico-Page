import { Component, Input } from '@angular/core';
import { SlideItem } from '../../carousel-item.interface';
@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() carouselControllers = true;
  @Input() options = {
    animation: 'fade',
    'max-height': 320,
  };
  @Input() slides: SlideItem[];
  @Input() skeleton = false;

  get getOptions() {
    let options = '';
    // tslint:disable-next-line: forin
    for (const key in this.options) {
      options += `${key}: ${this.options[`${key}`]}; `;
    }
    return options;
  }
}
