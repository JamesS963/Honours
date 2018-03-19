import { Component, OnInit } from '@angular/core';
import {AccountAuthService} from '../account-auth.service';
import {Observable} from 'rxjs/Observable';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  me: Observable<any>;
  constructor(public accountAuthService: AccountAuthService, public db: AngularFireDatabase) {
    this.me = this.accountAuthService.me;
  }

  ngOnInit() {
    this.me = this.accountAuthService.me;
  }

}
