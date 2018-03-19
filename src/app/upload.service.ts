import { Injectable } from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from 'angularfire2/storage';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {AccountAuthService} from './account-auth.service';
import {tap} from 'rxjs/operators';
import {AngularFireDatabase} from 'angularfire2/database';
@Injectable()
export class UploadServiceService {
  // Main task
  profileTask: AngularFireUploadTask;

  // Progress monitoring
  profilePercentage: Observable<number>;

  profileSnapshot: Observable<any>;

  // Download URL
  profileDownloadURL: Observable<string>;

  // Main task
  albumTask: AngularFireUploadTask;

  // Progress monitoring
  albumPercentage: Observable<number>;

  albumSnapshot: Observable<any>;

  // Download URL
  albumDownloadURL: Observable<string>;

  // Main task
  songTask: AngularFireUploadTask;

  // Progress monitoring
  songPercentage: Observable<number>;

  songSnapshot: Observable<any>;

  // Download URL
  songDownloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase, private authService: AccountAuthService) { }

  startProfileUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `profile/${this.authService.getUserID()}/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.profileTask = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.profilePercentage = this.profileTask.percentageChanges();
    this.profileSnapshot   = this.profileTask.snapshotChanges().pipe(
      tap((snapshot) => {
        if (snapshot.bytesTransferred === snapshot.totalBytes) {
          this.db.object('users/' + this.authService.getUserID()).update({
              profilePic: path
            });
        }
      })
    );

    // The file's download URL
    this.profileDownloadURL = this.profileTask.downloadURL();
    return this.profileDownloadURL;
  }

  startAlbumUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.albumTask = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.albumPercentage = this.albumTask.percentageChanges();
    this.albumSnapshot   = this.albumTask.snapshotChanges();

    // The file's download URL
    this.albumDownloadURL = this.albumTask.downloadURL();
  }


  startSongUpload(event: FileList) {
    // The File object
    const file = event.item(0);

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ');
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.songTask = this.storage.upload(path, file, { customMetadata });

    // Progress monitoring
    this.songPercentage = this.songTask.percentageChanges();
    this.songSnapshot   = this.songTask.snapshotChanges();

    // The file's download URL
    this.songDownloadURL = this.songTask.downloadURL();
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }
}
