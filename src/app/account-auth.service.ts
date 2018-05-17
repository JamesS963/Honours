import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import {FirebaseObjectObservable} from 'angularfire2/database-deprecated';

@Injectable()
export class AccountAuthService {
  // initilize variables
  id: string;
  authState = false;
  me: Observable<any>;
  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase) {
    // subscribe to the users auth state
    this.afAuth.authState.subscribe((auth) => {
      // if the user is logged in
      if (auth != null) {
        // set the users id
        this.id = auth.uid;
        // set the authstate to true meaning the user is logged in
        this.authState = true;
        // get the users data
        this.me = db.object('users/' + auth.uid).valueChanges();
      } else {
        // set authstate to false if user isn't logged in
        this.authState = false;
      }
    });
  }

  // attempt to login the user.
  login(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password);
  }
  // attempt to create a user account.
  createAccount(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((e) => {
      this.db.object('users/' + e.uid).update({id: e.uid});
    });
  }
  // attempts to logout the user.
  logout() { return this.afAuth.auth.signOut(); }

  // returns the users profile
  getMe() {
    return this.me;
  }
  // returns data telling the user if they are logged in
  getAuthState() {
    return this.authState;
  }

  // get's the users id
  getUserID() {
    return this.id;
  }
}
