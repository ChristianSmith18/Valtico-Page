import { Component, OnInit } from '@angular/core';
import UIkit from 'uikit';
import { CarouselService, SlideItem } from './services/carousel.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public indexSlideActive = 0;
  public slideHeight = 320;
  public slides: SlideItem[];
  public options = {
    animation: 'slide',
    'min-height': this.slideHeight - 1,
    'max-height': this.slideHeight,
    autoplay: true,
    'autoplay-interval': 8000,
    easing: 'ease-in-out',
    draggable: false,
  };

  constructor(private _carousel: CarouselService) {
    this.slides = this._carousel.getSlides;
  }

  ngOnInit(): void {
    const element = document.getElementById('slideshow');
    element.addEventListener('itemshown', () => {
      let count = 0;
      element.querySelectorAll('ul>li').forEach((item) => {
        if (item.classList.contains('uk-active')) {
          this.indexSlideActive = count;
        }
        count++;
      });
    });
  }

  setIndex(index: number): void {
    const element = document.getElementById('slideshow');
    UIkit.slideshow(element).show(index);
  }

  setHeight(total: number): string {
    return `${100 / total}%`;
  }
}
