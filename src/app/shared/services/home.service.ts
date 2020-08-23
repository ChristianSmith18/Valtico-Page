import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '@src/environments/environment';

export interface SocialNetwork {
  type: string;
  url: string;
  dateAt: Date;
  id?: string;
}

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getSocialNetworks() {
    return this.http.get(`${environment.apiUrl}/home`);
  }

  public updateSocialNetworks(id: string, socialNetwork: SocialNetwork) {
    return this.http.put(`${environment.apiUrl}/home?id=${id}`, socialNetwork);
  }
}
