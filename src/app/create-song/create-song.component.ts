import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {


  constructor(public songService: SongService, public router: Router) { }

  ngOnInit() {
  }

  createSong(title, artist, genre) {
    this.songService.createSong(title, artist, genre).then((success) =>{
      this.router.navigate(['/']);
    });
  }

}
