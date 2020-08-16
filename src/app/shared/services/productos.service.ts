import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Producto } from './../models/producto.interface';
import { environment } from '@src/environments/environment';

interface ResponseProductos {
  ok: boolean;
  productos: Producto[];
}

interface ResponseProducto {
  ok: boolean;
  producto: Producto;
}

interface ResponseState {
  ok: boolean;
  enabled: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getAllProductos() {
    return this.http.get<ResponseProductos>(`${environment.apiUrl}/productos`);
  }

  public getAllProductosWithFilter() {
    return this.http.get<ResponseProductos>(
      `${environment.apiUrl}/productos/filter`
    );
  }

  public createProducto(producto: Producto) {
    return this.http.post<ResponseProducto>(
      `${environment.apiUrl}/productos`,
      producto,
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }

  public updateProducto(id: string, producto: Producto) {
    return this.http.put<ResponseProducto>(
      `${environment.apiUrl}/productos?id=${id}`,
      producto,
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }

  public changeState(id: string, newState: boolean) {
    return this.http.put<ResponseState>(
      `${environment.apiUrl}/productos/state?id=${id}`,
      { enabled: newState },
      {
        headers: this._token.generateSecurityToken(),
      }
    );
  }

  public getTwoProductos() {
    return this.http.get<ResponseProductos>(
      `${environment.apiUrl}/productos/two`
    );
  }
}
