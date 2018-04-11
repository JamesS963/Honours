import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AccountAuthService} from '../account-auth.service';
import {AngularFireObject} from 'angularfire2/database';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profile: Observable<any>;
  constructor(public userService: UserService, public route: ActivatedRoute, public accountAuth: AccountAuthService) {
    this.profile = this.userService.getUser(this.accountAuth.getUserID());
  }


  ngOnInit() {
  }

}
