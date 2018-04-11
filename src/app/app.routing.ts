import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/compiler/src/core';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AccountSetupComponent} from './account-setup/account-setup.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {CreateSongComponent} from './create-song/create-song.component';
import {FileuploadComponent} from './file-upload/fileupload.component';
import {SongComponent} from './song/song.component';
import {MyPlaylistComponent} from './my-playlist/my-playlist.component';
import {ProfileComponent} from './profile/profile.component';


const appRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: 'accountSetup',
    component: AccountSetupComponent
  },
  {
    path: 'createSong',
    component: CreateSongComponent
  },
  {
    path: 'editProfile',
    component: EditProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'upload',
    component: FileuploadComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'song/:id',
    component: SongComponent
  },
  {
    path: 'playlist/:id',
    component: MyPlaylistComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  }

];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
