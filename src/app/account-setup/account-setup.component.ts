import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {UploadServiceService} from '../upload.service';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.css']
})
export class AccountSetupComponent implements OnInit {
  // image variable to set the image location to
  image;
  constructor(private userService: UserService, public uploadService: UploadServiceService) { }

  ngOnInit() {}


  // function which set's the image location
  setImage(i) {
    this.image = i;
  }
  // creates the users account
  createProfile(firstName, surname, nickname, age, bio) {
    // uploads image to firebase
    this.uploadService.startProfileUpload(this.image);
    // creates the users account
    this.userService.createProfile(firstName, surname, nickname, age, bio);
  }
}
