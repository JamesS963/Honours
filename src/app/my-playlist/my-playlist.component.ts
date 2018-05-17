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

  // initilize variables
  playlist = [];
  currentSong;
  currentArt;
  currentArtist;
  currentGenre;
  currentTitle;

  constructor(public songService: SongService, public route: ActivatedRoute) {
    // calls the songservice to return an observable of the playlist which is subscribed to
    songService.getPlaylist(this.route.snapshot.params['id']).subscribe((song) => {
      // goes through each song in the playlist
      for (const s of song){
        // gets the song based on the id and subscribes to the observable
        this.songService.getSong(s.id).subscribe((y) => {
          // pushes the song to the playlist
          this.playlist.push(y);
          // initilizes the first song in the playlist
          this.currentSong = this.playlist[0].song;
          this.currentArt = this.playlist[0].art;
          this.currentArtist = this.playlist[0].artist;
          this.currentGenre = this.playlist[0].genre;
          this.currentTitle = this.playlist[0].title;
        });
      }
    });

  }


  // set's the current playing song
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
