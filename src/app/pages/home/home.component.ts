import { Component } from '@angular/core';
import { SlideItem } from './carousel-item.interface';
import { Servicio } from '@shared/models/servicio.interface';
import { ServiciosService } from '@shared/services/servicios.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private _projects: ServiciosService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();

    const oneItem = localStorage.getItem('pmrOyrz');
    if (oneItem) {
      this.slides.push(JSON.parse(atob(oneItem)));
      this.loader = true;
      this.spinner.hide();
    }

    this._projects.getTwoServicios().subscribe(({ servicios }) => {
      this.createItemSlide(servicios);
      this.slides = this.createItemSlide(servicios);
      this.loader = true;
      this.spinner.hide();

      localStorage.setItem('pmrOyrz', btoa(JSON.stringify(this.slides[0])));
    });
  }
  private slideHeight = 490;

  public loader = false;
  public slides: SlideItem[] = [];
  public options = {
    animation: 'slide',
    'min-height': this.slideHeight - 1,
    'max-height': this.slideHeight,
    autoplay: true,
    'autoplay-interval': 4000,
    easing: 'ease-in-out',
    draggable: false,
  };

  public template = `
  <div>
    <img src="../../../assets/logo/Logo-Valtico.png" />
    <img src="../../../assets/img/home/loading.svg" />
  </div>
  `;

  private createItemSlide(servicios: Servicio[]): SlideItem[] {
    const slidesItem: SlideItem[] = [];

    if (servicios !== null) {
      servicios.forEach((servicio) => {
        const newslideItem: SlideItem = {
          title: servicio.title,
          description:
            servicio.largeDescription.length >= 100
              ? servicio.largeDescription.substring(0, 100) + '...'
              : servicio.largeDescription,
          img: servicio.imgPrimary,
          route: `/projects`,
        };

        slidesItem.push(newslideItem);
      });
    }
    return slidesItem;
  }
}
