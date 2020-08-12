import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { QuienesSomos } from '../models/quienes-somos.interface';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuienesSomosService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getData() {
    return this.http.get<QuienesSomos>(`${environment.apiUrl}/quienes-somos`);
  }
}
