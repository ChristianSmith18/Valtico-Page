import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { PagesModule } from './pages/pages.module';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SocialBarComponent } from './shared/components/social-bar/social-bar.component';
import { FooterComponent } from './shared/components/footer/footer.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, SocialBarComponent, FooterComponent],
  imports: [BrowserModule, AppRoutingModule, PagesModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
