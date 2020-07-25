import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { BlogComponent } from './blog/blog.component';
import { EventosComponent } from './eventos/eventos.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductosComponent },
  { path: 'services', component: ServiciosComponent },
  { path: 'about', component: QuienesSomosComponent },
  { path: 'clients', component: ClientesComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'events', component: EventosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
