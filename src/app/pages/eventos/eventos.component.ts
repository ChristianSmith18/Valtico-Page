import { Component, OnInit, OnDestroy } from '@angular/core';
import { Evento } from '@src/app/shared/models/evento.interface';
import { Subscription } from 'rxjs';
import { EventosService } from './../../shared/services/eventos.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss'],
})
export class EventosComponent implements OnInit, OnDestroy {
  public eventos: Evento[];
  public loaded = false;
  public noData = false;
  private blogSubscription: Subscription;

  constructor(private _eventos: EventosService) {}

  ngOnInit(): void {
    this.blogSubscription = this._eventos
      .getAllEventos(false)
      .subscribe((response) => {
        if (!response) {
          this.noData = true;
        } else {
          this.eventos = response.events;
        }
        this.loaded = true;
      });
  }

  ngOnDestroy(): void {
    this.blogSubscription.unsubscribe();
  }

  transformRoute(route: string): string {
    return `/events/${route}`;
  }
}
