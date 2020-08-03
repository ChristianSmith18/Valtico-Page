import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { QuienesSomosComponent } from './pages/quienes-somos/quienes-somos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CasosDeExitoComponent } from './pages/casos-de-exito/casos-de-exito.component';
import { BlogComponent } from './pages/blog/blog.component';
import { EventosComponent } from './pages/eventos/eventos.component';
import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    HomeComponent,
    ProductosComponent,
    ServiciosComponent,
    QuienesSomosComponent,
    ClientesComponent,
    CasosDeExitoComponent,
    BlogComponent,
    EventosComponent,
    NavbarComponent,
    BreadcrumbComponent,
  ],
  imports: [CommonModule, DashboardRoutingModule],
})
export class DashboardModule {}
