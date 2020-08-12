import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  public generateSecurityToken(): HttpHeaders {
    const token = localStorage.getItem('_token');
    const headers = new HttpHeaders().append(
      'authorization',
      `Bearer ${token}`
    );

    return headers;
  }
}
