import { Component } from '@angular/core';
import {AccountAuthService} from './account-auth.service';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public auth: boolean;
  constructor(private authService: AccountAuthService, afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((auth) => {
      if (auth != null) {
        this.auth = true; alert('logged In');
      } else { this.auth = false; alert('logged out'); }
    });

  }

  logout() {
    this.authService.logout();
  }
}
