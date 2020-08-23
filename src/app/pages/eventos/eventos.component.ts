import { Component, OnInit, OnDestroy } from '@angular/core';
import { Evento } from '@shared/models/evento.interface';
import { EventosService } from './../../shared/services/eventos.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit {
  public eventos: Evento[];
  public loaded = false;
  public noData = false;

  constructor(private _eventos: EventosService) {}

  ngOnInit(): void {
    this._eventos.getAllEventos(false).subscribe((response) => {
      if (!response) {
        this.noData = true;
      } else {
        this.eventos = response.events;
      }
      this.loaded = true;
    });
  }

  transformRoute(route: string): string {
    return `/events/${route}`;
  }
}
