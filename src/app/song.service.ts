import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AccountAuthService} from './account-auth.service';

@Injectable()
export class SongService {

  song: Observable<any>;
  playlist: Observable<any>;
  constructor(private db: AngularFireDatabase, private accountAuthService: AccountAuthService ) {
    this.song = db.list('songs/').valueChanges();
  }

  getPlaylist(id) {
    this.playlist = this.db.list('users/' + id + '/playlist').valueChanges();
    return this.playlist;
  }
  getSong(id) {
     this.song = this.db.object('songs/' + id).valueChanges();
     return this.song;
  }
  getSongs() {
    this.song = this.db.list('songs/').valueChanges();
    return this.song;
  }
  addToPlaylist(songID) {
    this.db.object('users/' + this.accountAuthService.getUserID() + '/playlist/' + songID).update({
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
  createSong(title, artist, genre, song, art) {
    return this.db.list('songs/').push({
      title: title,
      artist: artist,
      genre: genre,
      owner: this.accountAuthService.getUserID(),
      song: song,
      art: art
    }).then((s) => {
      this.db.object('songs/' + s.key).update({
        id: s.key
      });
      this.db.list('users/' + this.accountAuthService.getUserID() + '/ownedSongs').push({
        id: s.key
      });
    });
  }
  getComments(id) {
    return this.db.list('songs/' + id + '/comments').valueChanges();
  }
  postComment(id, message) {
    return this.accountAuthService.getMe().subscribe((e) => {
      this.db.list('songs/' + id + '/comments' ).push({
        id: this.accountAuthService.getUserID(),
        comment: message,
        displayName: e.nickname,
        pic: e.profilePic,
        timestamp: Date.now()
      });
    });
  }
}
