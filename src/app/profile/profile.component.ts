import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SongService} from '../song.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // initilize variables
  profile: Observable<any>;
  songs= [];

  userSongs: Observable<any>;
  constructor(public userService: UserService, public songService: SongService, public route: ActivatedRoute) {
    // gett's an observable of the users profile
    this.profile = userService.getUser(this.route.snapshot.params['id']);

    // get's  a list of all songs
    this.userSongs = songService.getUserSongs(this.route.snapshot.params['id']);
    this.userSongs.subscribe((song) => {
      // goes through a list of all song
      for (const s of song){
        // checks if the song is the same as th users
        this.songService.getSong(s.id).subscribe((y) => {
          this.songs.push(y);
        });
      }
    });
  }


  ngOnInit() {
  }

}
