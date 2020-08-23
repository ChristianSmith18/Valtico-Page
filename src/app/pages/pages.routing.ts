import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './que-hacemos/productos.component';
import { ServiciosComponent } from './proyectos/servicios.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { BlogComponent } from './blog/blog.component';
import { EventosComponent } from './eventos/eventos.component';
import { CasosDeExitoComponent } from './casos-de-exito/casos-de-exito.component';
import { PagesComponent } from './pages.component';
import { SingleBlogComponent } from './single-blog/single-blog.component';
import { SingleEventoComponent } from './single-evento/single-evento.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'what-do-we-do', component: ProductosComponent },
      { path: 'projects', component: ServiciosComponent },
      { path: 'about', component: QuienesSomosComponent },
      { path: 'clients', component: ClientesComponent },
      { path: 'success', component: CasosDeExitoComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/:id', component: SingleBlogComponent },
      { path: 'events', component: EventosComponent },
      { path: 'events/:id', component: SingleEventoComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
