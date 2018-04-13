import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {ActivatedRoute} from '@angular/router';
import {AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../user.service';
import {AccountAuthService} from '../account-auth.service';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song: Observable<any>;
  comments: Observable<any>;
  owner;
  ownerID;
  isjoined: boolean = false;
  isLoggedIn: boolean;

  constructor(public songService: SongService, public route: ActivatedRoute, public userService: UserService,
              public accountAuthService: AccountAuthService) {
    this.isLoggedIn = this.accountAuthService.getAuthState();
    this.song = songService.getSong(this.route.snapshot.params['id']);
    songService.getSong(this.route.snapshot.params['id']).subscribe((e) => {
      this.owner = this.userService.getUser(e.owner);
    });
    songService.getSong(this.route.snapshot.params['id']).subscribe((e) => {
      this.ownerID = e.owner;
    });
    this.comments = this.songService.getComments(this.route.snapshot.params['id']);
    this.songService.getPlaylist(this.accountAuthService.getUserID()).subscribe((songs) => {
      for (const song of songs){
        if (song.id === this.route.snapshot.params['id'] ) {
          this.isjoined = true;
        }
      }
    });
  }
  addToPlaylist() {
    this.isjoined = true;
    this.songService.addToPlaylist(this.route.snapshot.params['id']);
  }
  removeFromPlaylist() {
    this.isjoined = false;
    this.songService.removeFromPlaylist(this.route.snapshot.params['id']);
  }
  postComment(comment) {
    this.songService.postComment(this.route.snapshot.params['id'], comment);
  }
  ngOnInit() {
  }
}
