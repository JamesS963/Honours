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
// set initial variables to be posted
  album;
  song;
  albumSub;
  constructor(public songService: SongService, public uploadService: UploadServiceService, public router: Router) { }
 // sets upload to false, when this is true it will make the form dissapear and display a bar to show th datas uploading
  uploading = false;
  ngOnInit() {}
  // sets the album artwork for upload
  setAlbum(event) {
    this.album = event;
  }
  // sets the song location for upload
  setSong(event) {
    this.song = event;
  }
  // function to create the song
  createSong(title, artist, genre) {
    // set's uploading to true to make the form disapear
    this.uploading = true;
    // starts album art upload
    this.uploadService.startAlbumUpload(this.album).subscribe((a) => {
      // subscribes to the album upload to get the album location
      this.albumSub = a;
      // starts an upload of the song
      this.uploadService.startSongUpload(this.song).subscribe((s) => {
        // creates the song and sets the user data for the song
        this.songService.createSong(title, artist, genre, s, this.albumSub).then((success) => {
          //  this.router.navigate(['/']);
        });
      });
    });
  }

}
