import { Component, OnInit } from '@angular/core';
import {SongService} from '../song.service';
import {Router} from '@angular/router';
import {UploadServiceService} from '../upload.service';

@Component({
  selector: 'app-create-song',
  templateUrl: './create-song.component.html',
  styleUrls: ['./create-song.component.css']
})
export class CreateSongComponent implements OnInit {

  album;
  image;

  constructor(public songService: SongService, public uploadService: UploadServiceService, public router: Router) { }

  ngOnInit() {
  }

  setAlbum(event) {
    this.album = event;
  }
  setSong(event) {
    this.image = event;
  }
  createSong(title, artist, genre) {
    this.songService.createSong(title, artist, genre).then((success) => {
      this.router.navigate(['/']);
    });
  }

}
