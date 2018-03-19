import { Component, OnInit } from '@angular/core';
import {AccountAuthService} from '../account-auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {SongService} from '../song.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  me: Observable<any>;
  songs: Observable<any>;
  constructor(public accountAuthService: AccountAuthService, public db: AngularFireDatabase, public songService: SongService) {
    this.me = this.accountAuthService.me;
    this.songs = songService.getSongs();
  }

  ngOnInit() {
    this.me = this.accountAuthService.me;

  }

}
