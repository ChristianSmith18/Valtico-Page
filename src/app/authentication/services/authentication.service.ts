import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly fireAuth: AngularFireAuth) {}

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
}
