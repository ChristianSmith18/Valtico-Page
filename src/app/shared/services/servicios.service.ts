import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Servicio } from './../models/servicio.interface';
import { environment } from '@src/environments/environment';

interface ResponseServicios {
  ok: boolean;
  servicios: Servicio[];
}

interface ResponseServicio {
  ok: boolean;
  servicio: Servicio;
}

interface ResponseState {
  ok: boolean;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getAllServicios() {
    return this.http.get<ResponseServicios>(`${environment.apiUrl}/servicios`);
  }

  public getAllServiciosWithFilter() {
    return this.http.get<ResponseServicios>(
      `${environment.apiUrl}/servicios/filter`
    );
  }

  public createServicio(servicio: Servicio) {
    return this.http.post<ResponseServicio>(
      `${environment.apiUrl}/servicios`,
      servicio,
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }

  public updateServicio(id: string, servicio: Servicio) {
    return this.http.put<ResponseServicio>(
      `${environment.apiUrl}/servicios?id=${id}`,
      servicio,
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }

  public changeState(id: string, newState: boolean) {
    return this.http.put<ResponseState>(
      `${environment.apiUrl}/servicios/state?id=${id}`,
      { enabled: newState },
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }
}
