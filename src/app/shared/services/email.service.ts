import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Email } from './../models/email.interface';
import { environment } from '@src/environments/environment';

interface SingleResponse {
  ok: boolean;
  data: Email;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor(private http: HttpClient, private _token: TokenService) {}

  public sendEmail(email: Email) {
    return this.http.post<SingleResponse>(
      `${environment.apiUrl}/send-email`,
      email
    );
  }
}
