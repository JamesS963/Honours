import { Injectable } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class UserService {

  constructor(public afAuth: AngularFireAuth) { }

  createAccount(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword( email, password);
  }


