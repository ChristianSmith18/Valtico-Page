import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Modules
import { AuthenticationRoutingModule } from './authentication.routing';

// Components
import { LoginComponent } from './login/login.component';
import { AuthenticationComponent } from './authentication.component';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '@src/environments/environment';

@NgModule({
  declarations: [LoginComponent, AuthenticationComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthenticationRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    NgxSpinnerModule,
  ],
})
export class AuthenticationModule {}
