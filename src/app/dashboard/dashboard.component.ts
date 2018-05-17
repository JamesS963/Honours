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
  // observable of the logged in user
  me: Observable<any>;
  // list of songs, this is an object instead of an observable to deal with the filter
  songs = [];
  // firebase list observable of all members of the website
  users: Observable<any>;
  // comment section list on the dashboard
  comments: Observable<any>;
  // static list of all the songs to set songs equal to before filtering
  staticSongs = [];
  authstate = false;
  // constructer to set up data
  constructor(public accountAuthService: AccountAuthService, public db: AngularFireDatabase,
              public songService: SongService, public userService: UserService, public messageService: MessageService) {
    this.authstate = this.accountAuthService.getAuthState();
    // sets user to them
    this.me = this.accountAuthService.me;
    // sets songs and static songs to the list of songs
    songService.getSongs().subscribe((songs) => {
      this.songs = songs;
      this.staticSongs = songs;
    });
    // sets the list of users
    this.users = userService.getUsers();
    // gets the list of messages
    this.comments = this.messageService.getComments();
  }
  // calls the message service to post a comment.
  postComment(comment) {
    this.messageService.postComment( comment);
  }
  // //filter function
  filterItem(value) {
    // resets the songs
    this.songs = [];
    // goes through all the songs available
    for (const song of this.staticSongs){
      //  sets data to the song genre
      const data = song.genre.toUpperCase();
      // checks if the filter matches any genre of song
      if (data.indexOf(value.toUpperCase()) >= 0) {
        // pushes the song to the new song variable
        this.songs.push(song);
      }
    }
  }
  ngOnInit() {
    // get's the users data
    this.me = this.accountAuthService.me;

  }

}
