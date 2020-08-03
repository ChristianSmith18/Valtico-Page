import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';
import { AuthenticationModule } from './authentication/authentication.module';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, PagesModule, AuthenticationModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
