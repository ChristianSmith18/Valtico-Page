import { Component, OnInit } from '@angular/core';
import UIkit from 'uikit';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const element = document.getElementById('slideshow');
    element.addEventListener('itemshown', () => {
      let count = 0;
      element.querySelectorAll('ul>li').forEach((item) => {
        if (item.classList.contains('uk-active')) {
          console.log(count);
        }
        count++;
      });
    });
  }

  setIndex(index: number) {
    const element = document.getElementById('slideshow');
    UIkit.slideshow(element).show(index);
  }
}
