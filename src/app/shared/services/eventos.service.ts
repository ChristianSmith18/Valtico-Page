import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '@src/environments/environment';
import { Evento } from './../models/evento.interface';

interface Response {
  ok: boolean;
  events: Evento[];
  count: number;
}

interface SingleResponse {
  ok: boolean;
  event: Evento;
}

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getAllEventos(admin: boolean) {
    if (admin) {
      return this.http.get<Response>(`${environment.apiUrl}/eventos/all`);
    }
    return this.http.get<Response>(`${environment.apiUrl}/eventos/all-filter`);
  }

  public getOneEvento(id: string) {
    return this.http.get<SingleResponse>(
      `${environment.apiUrl}/eventos?id=${id}`
    );
  }

  public createEvento(evento: Evento) {
    return this.http.post<Evento>(`${environment.apiUrl}/eventos`, evento, {
      headers: this._token.generateSecurityToken(),
    });
  }

  public updateEvento(id: string, evento: Evento) {
    return this.http.put<Evento>(
      `${environment.apiUrl}/eventos?id=${id}`,
      evento,
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }

  public changeState(id: string, newState: boolean) {
    return this.http.put<Evento>(
      `${environment.apiUrl}/eventos/state?id=${id}`,
      { enabled: newState },
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }
}
