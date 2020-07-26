import { Component, Input } from '@angular/core';

interface SlideItem {
  title: string;
  description: string;
  route: string;
  img: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() carouselControllers = true;
  @Input() maxHeight = 320;

  public slides: SlideItem[] = [
    {
      title: 'First',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      route: 'products',
      img: 'https://getuikit.com/docs/images/photo.jpg',
    },
    {
      title: 'Second',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      route: 'products',
      img: 'https://getuikit.com/docs/images/dark.jpg',
    },
    {
      title: 'Third',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      route: 'products',
      img: 'https://getuikit.com/docs/images/light.jpg',
    },
  ];

  constructor() {}
}
