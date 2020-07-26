import { Component, Input } from '@angular/core';
import { CarouselService, SlideItem } from '../../services/carousel.service';
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
  public slides: SlideItem[];

  constructor(private _carousel: CarouselService) {
    this.slides = this._carousel.getSlides;
  }

  get getOptions() {
    let options = '';
    // tslint:disable-next-line: forin
    for (const key in this.options) {
      options += `${key}: ${this.options[`${key}`]}; `;
    }
    return options;
  }
}
