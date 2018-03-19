import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {UploadServiceService} from '../upload.service';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.css']
})
export class AccountSetupComponent implements OnInit {
  image;
  constructor(private userService: UserService, public uploadService: UploadServiceService) { }

  ngOnInit() {}


  setImage(i) {
    this.image = i;
  }
  createProfile(firstName, surname, nickname, age, bio) {
    this.uploadService.startProfileUpload(this.image);
    this.userService.createProfile(firstName, surname, nickname, age, bio);
  }

}
