import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private readonly fireAuth: AngularFireAuth,
    private http: HttpClient
  ) {}

  authState() {
    return this.fireAuth.authState;
  }

  signIn(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    return this.fireAuth.signOut();
  }

  forgotPassword() {
    return this.fireAuth.sendPasswordResetEmail(
      'valticochile.hosting@gmail.com'
    );
  }

  createToken(admin: string) {
    const headers = new HttpHeaders().append('admin', admin);

    return this.http.get<{ ok: boolean; token: string }>(
      `${environment.apiUrl}/login`,
      { headers }
    );
  }
}
