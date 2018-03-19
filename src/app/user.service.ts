import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

import {AccountAuthService} from './account-auth.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public auth: AccountAuthService) { }

  createAccount(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  getUser(id) { return this.db.object('users/' + id); }

  login(email, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password);
  }
  createProfile(firstName, surname, nickname, age, bio) {
    this.db.object('users/' + this.auth.getUserID()).update({
      firstName: firstName,
      surname: surname,
      nickname: nickname,
      age: age,
      bio: bio,
    });
  }
  }


