import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AccountAuthService} from '../account-auth.service';
import {AngularFireObject} from 'angularfire2/database';
import {UploadServiceService} from '../upload.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  // observable for the progile
  profile: Observable<any>;
  // image for image upload
  image;
  constructor(public userService: UserService, public route: ActivatedRoute,
              public accountAuth: AccountAuthService, public uploadService: UploadServiceService) {
    // calls the user service to get the profile passing through the users id
    this.profile = this.userService.getUser(this.accountAuth.getUserID());
  }


  ngOnInit() {
  }
  // set's the image for upload
  setImage(i) {
    this.image = i;
  }
  // edits the profile.
  createProfile(firstName, surname, nickname, age, bio) {
    this.uploadService.startProfileUpload(this.image);
    this.userService.createProfile(firstName, surname, nickname, age, bio);
  }
}
