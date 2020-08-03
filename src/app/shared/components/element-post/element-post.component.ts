import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-element-post',
  templateUrl: './element-post.component.html',
  styleUrls: ['./element-post.component.scss'],
})
export class ElementPostComponent implements OnInit {
  @Input() tag = 'Blogs';
  @Input() frontImg =
    'https://pinkelephant-latam.com/wp-content/uploads/2020/07/webinar-automation-blog-ok.jpg';
  @Input() title = 'Sin Título';
  @Input() text =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic accusantium corrupti ipsa blanditiis, pariatur consequuntur ut delectus corporis, ratione non debitis voluptates totam minus nesciunt officia.';
  @Input() date = '27 de Julio del 2020';
  @Input() route = '';

  constructor() {}

  ngOnInit(): void {}
}
