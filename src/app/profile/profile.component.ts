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
  profile: Observable<any>;
  songs= [];
  comments: Observable<any>;
  constructor(public userService: UserService, public songService: SongService, public route: ActivatedRoute) {
    this.profile = userService.getUser(this.route.snapshot.params['id']);
    this.comments = userService.getComments(this.route.snapshot.params['id']);
    songService.getSongs().subscribe((song) => {
      for (const s of song){
        this.songService.getSong(s.id).subscribe((y) => {
          this.songs.push(y);
        });
      }
    });
  }

  postComment(comment) {
    this.userService.postComment(this.route.snapshot.params['id'], comment);
  }
  ngOnInit() {
  }

}
