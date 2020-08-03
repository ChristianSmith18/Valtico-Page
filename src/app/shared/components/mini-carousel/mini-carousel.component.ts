import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-mini-carousel',
  templateUrl: './mini-carousel.component.html',
  styleUrls: ['./mini-carousel.component.scss'],
})
export class MiniCarouselComponent implements OnInit {
  @Input() title = 'Sin título';
  constructor() {}

  ngOnInit(): void {}
}
