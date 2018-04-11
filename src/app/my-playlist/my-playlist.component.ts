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
  currentSong;
  currentArt;
  currentArtist;
  currentGenre;
  currentTitle;

  constructor(public songService: SongService, public route: ActivatedRoute) {
    songService.getPlaylist(this.route.snapshot.params['id']).subscribe((song) => {
      for (const s of song){
        this.songService.getSong(s.id).subscribe((y) => {
          this.playlist.push(y);
          this.currentSong = this.playlist[0].song;
          this.currentArt = this.playlist[0].art;
          this.currentArtist = this.playlist[0].artist;
          this.currentGenre = this.playlist[0].genre;
          this.currentTitle = this.playlist[0].title;
        });
      }
    });

  }


  setSong(song) {
    this.currentSong = song.song;
    this.currentArt = song.art;
    this.currentArtist = song.artist;
    this.currentGenre = song.genre;
    this.currentTitle = song.title;
  }
  nextSong() { alert('hello'); }
  ngOnInit() {
  }

}
