import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

import {AccountAuthService} from './account-auth.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable()
export class UserService {

  constructor(public afAuth: AngularFireAuth, public db: AngularFireDatabase, public auth: AccountAuthService) { }

  createAccount(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((e) => {
      this.db.object('users/' + e.uid).update({id: e.uid});
    });
  }
  getUser(id) { return this.db.object('users/' + id).valueChanges(); }

  getUsers() { return this.db.list('users/').valueChanges(); }
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
  getComments(id) {
    return this.db.list('users/' + id + '/comments').valueChanges();
  }
  postComment(id, message) {
    this.auth.getMe().subscribe((e) => {
      this.db.list('users/' + id + '/comments').push({
        id: e.id,
        comment: message,
        displayName: e.nickname,
        pic: e.profilePic,
        timestamp: Date.now()
      });
    });
  }
  }


