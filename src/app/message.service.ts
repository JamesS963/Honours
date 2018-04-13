import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AccountAuthService} from './account-auth.service';

@Injectable()
export class MessageService {

  constructor(public db: AngularFireDatabase, public accountAuthService: AccountAuthService ) { }
  getComments() {
    return this.db.list('messages/').valueChanges();
  }
  postComment( message) {
    this.accountAuthService.getMe().subscribe((e) => {
      this.db.list('messages' ).push({
        id: this.accountAuthService.getUserID(),
        comment: message,
        displayName: e.nickname,
        pic: e.profilePic,
        timestamp: Date.now()
      });
    });
  }

}
