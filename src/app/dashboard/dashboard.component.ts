import {Component, OnInit, PipeTransform} from '@angular/core';
import {AccountAuthService} from '../account-auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {SongService} from '../song.service';
import {UserService} from '../user.service';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  me: Observable<any>;
  songs = [];
  users: Observable<any>;
  comments: Observable<any>;
  staticSongs = [];
  constructor(public accountAuthService: AccountAuthService, public db: AngularFireDatabase,
              public songService: SongService, public userService: UserService, public messageService: MessageService) {
    this.me = this.accountAuthService.me;
    songService.getSongs().subscribe((songs) => {
      this.songs = songs;
      this.staticSongs = songs;
    });
    this.users = userService.getUsers();
    this.comments = this.messageService.getComments();
  }

  postComment(comment) {
    this.messageService.postComment( comment);
  }
  filterItem(value) {
    this.songs = [];
    for (const song of this.staticSongs){
      const data = song.genre.toUpperCase();
      if (data.indexOf(value.toUpperCase()) >= 0) {
        this.songs.push(song);
      }
    }
  }
  ngOnInit() {
    this.me = this.accountAuthService.me;

  }

}
