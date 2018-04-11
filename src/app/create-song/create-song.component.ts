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
  song;
  albumSub;
  constructor(public songService: SongService, public uploadService: UploadServiceService, public router: Router) { }
  uploading = false;
  ngOnInit() {}

  setAlbum(event) {
    this.album = event;
  }
  setSong(event) {
    this.song = event;
  }
  createSong(title, artist, genre) {
    alert(title);
    alert(artist);
    alert(genre);
    this.uploading = true;
    this.uploadService.startAlbumUpload(this.album).subscribe((a) => {
      this.albumSub = a;
      this.uploadService.startSongUpload(this.song).subscribe((s) => {
        this.songService.createSong(title, artist, genre, s, this.albumSub).then((success) => {
          //  this.router.navigate(['/']);
        });
      });
    });
  }

}
