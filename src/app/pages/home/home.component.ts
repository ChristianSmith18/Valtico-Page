import { Servicio } from './../../shared/models/servicio.interface';
import { Producto } from '@src/app/shared/models/producto.interface';
import { ServiciosService } from './../../shared/services/servicios.service';
import { ProductosService } from '@src/app/shared/services/productos.service';
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
  public loader = false;
  public indexSlideActive = 0;
  public slideHeight = 320;
  public slides: SlideItem[];
  public slidesProductos: Producto[];
  public slidesServicios: Servicio[];
  public options = {
    animation: 'slide',
    'min-height': this.slideHeight - 1,
    'max-height': this.slideHeight,
    autoplay: true,
    'autoplay-interval': 8000,
    easing: 'ease-in-out',
    draggable: false,
  };

  constructor(
    private _carousel: CarouselService,
    private _productos: ProductosService,
    private _servicios: ServiciosService
  ) {
    this.slides = this._carousel.getSlides;
    this._productos.getTwoProductos().subscribe(({ productos }) => {
      this.slidesProductos = productos;
      this.slides = this.transformOneSlide();
    });
    this._servicios.getTwoServicios().subscribe(({ servicios }) => {
      this.slidesServicios = servicios;
      this.transformOneSlide();
      this.slides = this.transformOneSlide();
    });
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

  transformOneSlide(): SlideItem[] {
    const slidesItem: SlideItem[] = [];
    if (this.slidesProductos !== null) {
      this.slidesProductos.forEach((producto) => {
        const newslideItem: SlideItem = {
          title: producto.title,
          description: producto.shortDescription,
          img: producto.imgPrimary,
          route: `/products`,
        };

        slidesItem.push(newslideItem);
      });
    }

    if (this.slidesServicios !== null) {
      this.slidesServicios.forEach((servicio) => {
        const newslideItem: SlideItem = {
          title: servicio.title,
          description: servicio.largeDescription.substring(0, 100) + '...',
          img: servicio.imgPrimary,
          route: `/services`,
        };

        slidesItem.push(newslideItem);
      });
    }
    console.clear();
    this.loader = true;
    return slidesItem;
  }
}
