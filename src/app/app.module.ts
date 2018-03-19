import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AppRouting} from './app.routing';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';
import { AccountSetupComponent } from './account-setup/account-setup.component';
import {UserService} from './user.service';
import {MatButtonModule, MatButtonToggle, MatButtonToggleModule, MatMenuModule, MatToolbar, MatToolbarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AccountAuthService} from './account-auth.service';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateSongComponent } from './create-song/create-song.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { DropZoneDirective } from './drop-zone.directive';
import { FileuploadComponent } from './file-upload/fileupload.component';
import { FileSizePipe } from './file-size.pipe';
import { SongComponent } from './song/song.component';
import { BrowseSongsComponent } from './browse-songs/browse-songs.component';
import {SongService} from './song.service';
import { MyPlaylistComponent } from './my-playlist/my-playlist.component';
import {UploadServiceService} from './upload.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyCEc0gZV7cOe0Od1S9Wa7RZ2M53xrzXj6g',
  authDomain: 'honours-2f026.firebaseapp.com',
  databaseURL: 'https://honours-2f026.firebaseio.com',
  projectId: 'honours-2f026',
  storageBucket: 'honours-2f026.appspot.com',
  messagingSenderId: '1050475221619'
};

export let MD_MODULES: any = [
  MatButtonModule,
  MatButtonToggleModule,
  MatMenuModule,
  MatToolbarModule
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AccountSetupComponent,
    DashboardComponent,
    EditProfileComponent,
    CreateSongComponent,
    DropZoneDirective,
    FileuploadComponent,
    FileSizePipe,
    SongComponent,
    BrowseSongsComponent,
    MyPlaylistComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRouting,
    FormsModule,
    [MD_MODULES]
  ],
  providers: [
    UserService,
    AccountAuthService,
    SongService,
    UploadServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
