import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Extern modules
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SocialBarComponent } from './components/social-bar/social-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MiniCarouselComponent } from './components/mini-carousel/mini-carousel.component';
import { ElementBoxComponent } from './components/element-box/element-box.component';
import { ElementDescriptionComponent } from './components/element-description/element-description.component';
import { ElementPostComponent } from './components/element-post/element-post.component';
import { RouterModule } from '@angular/router';
import { DisplayTimePipe } from './pipes/display-time.pipe';

const globalComponents = [
  NavbarComponent,
  SocialBarComponent,
  FooterComponent,
  MiniCarouselComponent,
  ElementBoxComponent,
  ElementDescriptionComponent,
  ElementPostComponent,
  DisplayTimePipe,
];

@NgModule({
  declarations: [...globalComponents],
  imports: [CommonModule, FormsModule, RouterModule, NgxSkeletonLoaderModule],
  exports: [...globalComponents],
})
export class SharedModule {}
