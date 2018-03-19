import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {Route} from '@angular/compiler/src/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-my-playlist',
  templateUrl: './my-playlist.component.html',
  styleUrls: ['./my-playlist.component.css']
})
export class MyPlaylistComponent implements OnInit {

  playlist = [];

  constructor(public songService: SongService, public route: ActivatedRoute) {
    songService.getPlaylist(this.route.snapshot.params['id']).subscribe((song) => {
      for (const s of song){
        this.songService.getSong(s.id).subscribe((y) => {
          this.playlist.push(y);
        });
      }
    });
  }

  ngOnInit() {
  }

}
