import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages.routing';
import { SharedModule } from '@shared/shared.module';

// Extern Modules
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

// Components
import { HomeComponent } from './home/home.component';
import { ServiciosComponent } from './proyectos/servicios.component';
import { ProductosComponent } from './que-hacemos/productos.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { CasosDeExitoComponent } from './casos-de-exito/casos-de-exito.component';
import { BlogComponent } from './blog/blog.component';
import { EventosComponent } from './eventos/eventos.component';
import { PagesComponent } from './pages.component';

import { CarouselComponent } from './home/components/carousel/carousel.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { SingleEventoComponent } from './single-evento/single-evento.component';

@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    ProductosComponent,
    ServiciosComponent,
    QuienesSomosComponent,
    ClientesComponent,
    BlogComponent,
    EventosComponent,
    CasosDeExitoComponent,
    CarouselComponent,
    SingleBlogComponent,
    SingleEventoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    PagesRoutingModule,
    NgxSpinnerModule,
    NgxSkeletonLoaderModule,
  ],
})
export class PagesModule {}
