import { Component, OnDestroy } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent implements OnDestroy {
  private authSubscription: Subscription;

  constructor(private _authentication: AuthenticationService) {
    this.authSubscription = this._authentication.authState().subscribe((u) => {
      console.log('Estoy en AuthenticationComponent', u);
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
