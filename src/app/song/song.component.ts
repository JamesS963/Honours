import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {FirebaseListObservable} from 'angularfire2/database-deprecated';
import {ActivatedRoute} from '@angular/router';
import {AngularFireObject} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
  song: Observable<any>;
  constructor(public songService: SongService, public route: ActivatedRoute) {
    this.song = songService.getSong(this.route.snapshot.params['id']);
  }

  ngOnInit() {
  }

  addToPlaylist() {
    this.songService.addToPlaylist(this.route.snapshot.params['id']);
  }
  removeFromPlaylist() {
    this.songService.removeFromPlaylist(this.route.snapshot.params['id']);
  }
}
