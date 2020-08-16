import { Footer } from './../models/footer.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { environment } from '@src/environments/environment';

interface Response {
  ok: boolean;
  data: Footer[];
}

interface SingleResponse {
  ok: boolean;
  data: Footer;
}

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public getFooterElements() {
    return this.http.get<Response>(`${environment.apiUrl}/footer`);
  }

  public updateFooterElement(id: string, footer: Footer) {
    return this.http.put<SingleResponse>(
      `${environment.apiUrl}/footer?id=${id}`,
      footer
    );
  }
}
