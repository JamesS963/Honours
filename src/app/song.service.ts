import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AccountAuthService} from './account-auth.service';

@Injectable()
export class SongService {

  song: Observable<any>;
  constructor(private db: AngularFireDatabase, private accountAuthService: AccountAuthService ) {
    this.song = db.list('songs/').valueChanges();
  }

  getSong(id) {
    return this.db.object('songs/' + id).valueChanges();
  }
  getSongs() {
    return this.song;
  }
  addToPlaylist(songID) {
    this.db.object('users/' + this.accountAuthService.getUserID() + '/playlist/' +songID).update({
      id: songID
    });
    this.db.object('songs/' + songID + '/subscribers/' + this.accountAuthService.getUserID() ).update({
      id: this.accountAuthService.getUserID()
    });
  }
  removeFromPlaylist(songID) {
    this.db.object('users/' + this.accountAuthService.getUserID() + '/playlist/' + songID).remove();
    this.db.object('songs/' + songID + '/subscribers/' + this.accountAuthService.getUserID() ).remove();
  }
  createSong(title, artist, genre) {
    return this.db.list('songs/').push({
      title: title,
      artist: artist,
      genre: genre
    }).then((s) => {
      this.db.object('songs/' + s.key).update({
        id: s.key
      });
      this.db.list('users/' + this.accountAuthService.getUserID() + '/ownedSongs').push({
        id: s.key
      });
    });
  }
}
