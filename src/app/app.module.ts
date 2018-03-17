import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AppRouting} from './app.routing';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyCEc0gZV7cOe0Od1S9Wa7RZ2M53xrzXj6g',
  authDomain: 'honours-2f026.firebaseapp.com',
  databaseURL: 'https://honours-2f026.firebaseio.com',
  projectId: 'honours-2f026',
  storageBucket: 'honours-2f026.appspot.com',
  messagingSenderId: '1050475221619'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
