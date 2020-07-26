import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ProductosComponent } from './productos/productos.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { BlogComponent } from './blog/blog.component';
import { EventosComponent } from './eventos/eventos.component';
import { CarouselComponent } from './home/components/carousel/carousel.component';

const components = [
  HomeComponent,
  ProductosComponent,
  ServiciosComponent,
  QuienesSomosComponent,
  ClientesComponent,
  BlogComponent,
  EventosComponent,
];

@NgModule({
  declarations: [...components, CarouselComponent],
  imports: [CommonModule],
  exports: [...components],
})
export class PagesModule {}
