import { Injectable } from '@angular/core';

export interface SlideItem {
  title: string;
  description: string;
  route: string;
  img: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarouselService {
  private slides: SlideItem[] = [
    {
      title: 'First',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      route: '/products',
      img: 'https://getuikit.com/docs/images/photo.jpg',
    },
    {
      title: 'Second',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      route: '/about',
      img: 'https://getuikit.com/docs/images/dark.jpg',
    },
    {
      title: 'Third',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      route: '/clients',
      img: 'https://getuikit.com/docs/images/light.jpg',
    },
  ];
  constructor() {}

  get getSlides() {
    return this.slides;
  }
}
