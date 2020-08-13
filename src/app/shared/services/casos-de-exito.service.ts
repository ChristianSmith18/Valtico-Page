import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { CasoDeExito } from './../models/caso-de-exito.interface';
import { environment } from '@src/environments/environment';

interface ResponseCasosDeExito {
  ok: boolean;
  casosDeExito: CasoDeExito[];
}

interface ResponseCasoDeExito {
  ok: boolean;
  casoDeExito: CasoDeExito;
}

interface ResponseState {
  ok: boolean;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CasosDeExitoService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getAllCasosDeExito() {
    return this.http.get<ResponseCasosDeExito>(
      `${environment.apiUrl}/casos-de-exito`
    );
  }

  public getAllCasosDeExitoWithFilter() {
    return this.http.get<ResponseCasosDeExito>(
      `${environment.apiUrl}/casos-de-exito/filter`
    );
  }

  public createCasoDeExito(casoDeExito: CasoDeExito) {
    return this.http.post<ResponseCasoDeExito>(
      `${environment.apiUrl}/casos-de-exito`,
      casoDeExito,
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }

  public updateCasoDeExito(id: string, casoDeExito: CasoDeExito) {
    return this.http.put<ResponseCasoDeExito>(
      `${environment.apiUrl}/casos-de-exito?id=${id}`,
      casoDeExito,
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }

  public changeState(id: string, newState: boolean) {
    return this.http.put<ResponseState>(
      `${environment.apiUrl}/casos-de-exito/state?id=${id}`,
      { enabled: newState },
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }
}
