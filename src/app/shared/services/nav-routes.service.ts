import { Injectable } from '@angular/core';

export interface NavbarRoutes {
  name: string;
  route: string;
  icon: string;
  child?: NavbarRoutes[];
}

@Injectable({
  providedIn: 'root',
})
export class NavRoutesService {
  private navbarRoutes: NavbarRoutes[] = [
    { name: 'home', route: 'home', icon: 'fas fa-home' },
    {
      name: 'qué hacemos',
      route: 'what-do-we-do',
      icon: 'fas fa-question-circle',
    },
    { name: 'proyectos', route: 'projects', icon: 'fas fa-project-diagram' },
    { name: 'quiénes somos', route: 'about', icon: 'fas fa-question-circle' },
    {
      name: 'clientes',
      route: 'clients',
      icon: 'fas fa-users',
      child: [
        { name: 'casos de éxito', route: 'success', icon: 'fas fa-thumbs-up' },
      ],
    },
    { name: 'blog', route: 'blog', icon: 'fas fa-blog' },
    { name: 'eventos', route: 'events', icon: 'fas fa-calendar-week' },
  ];
  constructor() {}

  get getNavbarRoutes(): NavbarRoutes[] {
    return this.navbarRoutes;
  }
}
