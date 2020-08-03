import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CasosDeExitoComponent } from './pages/casos-de-exito/casos-de-exito.component';
import { BlogComponent } from './pages/blog/blog.component';
import { EventosComponent } from './pages/eventos/eventos.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { title: 'home' } },
      {
        path: 'products',
        component: ProductosComponent,
        data: { title: 'products' },
      },
      {
        path: 'services',
        component: ServiciosComponent,
        data: { title: 'services' },
      },
      {
        path: 'about',
        component: QuienesSomosComponent,
        data: { title: 'about' },
      },
      {
        path: 'clients',
        component: ClientesComponent,
        data: { title: 'clients' },
      },
      {
        path: 'success',
        component: CasosDeExitoComponent,
        data: { title: 'success' },
      },
      { path: 'blog', component: BlogComponent, data: { title: 'blog' } },
      {
        path: 'events',
        component: EventosComponent,
        data: { title: 'events' },
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
