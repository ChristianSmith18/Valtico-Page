import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getSocialNetworks() {
    return this.http.get(`${environment.apiUrl}/home`);
  }
}
