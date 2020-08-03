import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { QuienesSomosComponent } from './quienes-somos/quienes-somos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { BlogComponent } from './blog/blog.component';
import { EventosComponent } from './eventos/eventos.component';
import { CasosDeExitoComponent } from './casos-de-exito/casos-de-exito.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'products', component: ProductosComponent },
      { path: 'services', component: ServiciosComponent },
      { path: 'about', component: QuienesSomosComponent },
      { path: 'clients', component: ClientesComponent },
      { path: 'success', component: CasosDeExitoComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'events', component: EventosComponent },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
