import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Cliente } from './../models/cliente.interface';
import { environment } from './../../../environments/environment';

interface ClienteResponse {
  ok: boolean;
  clientes: Cliente[];
  count: number;
}

interface ClienteState {
  ok: boolean;
  enabled: boolean;
}

interface ClienteCreate {
  ok: boolean;
  cliente: Cliente;
}

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getClientes(admin: boolean) {
    if (admin) {
      return this.http.get<ClienteResponse>(`${environment.apiUrl}/clientes`);
    }
    return this.http.get<ClienteResponse>(
      `${environment.apiUrl}/clientes/filter`
    );
  }

  public createCliente(cliente: Cliente) {
    return this.http.post<ClienteCreate>(
      `${environment.apiUrl}/clientes`,
      cliente,
      { headers: this._token.generateSecurityToken() }
    );
  }

  public updateCliente(id: string, cliente: Cliente) {
    return this.http.put<ClienteState>(
      `${environment.apiUrl}/clientes?id=${id}`,
      cliente,
      { headers: this._token.generateSecurityToken() }
    );
  }

  public setStateCliente(id: string, newState: boolean) {
    return this.http.put<ClienteState>(
      `${environment.apiUrl}/clientes/state?id=${id}`,
      { enabled: newState },
      { headers: this._token.generateSecurityToken() }
    );
  }
}
