import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class AccountAuthService {
  id: string;
  authState = false;
  me: Observable<any>;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    this.afAuth.authState.subscribe((auth) => {
      if (auth != null) {
        this.id = auth.uid;
        this.authState = true;
        this.me = db.object('users/' + auth.uid).valueChanges();
      } else {
        this.authState = false;
      }
    });
  }

  login(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password);
  }

  logout() { return this.afAuth.auth.signOut(); }

  getMe() {
    return this.me;
  }
  getAuthState() {
    return this.authState;
  }

  getUserID() {
    return this.id;
  }
}
