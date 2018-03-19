import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-account-setup',
  templateUrl: './account-setup.component.html',
  styleUrls: ['./account-setup.component.css']
})
export class AccountSetupComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {}

  createProfile(firstName, surname, nickname, age, bio) {
    this.userService.createProfile(firstName, surname, nickname, age, bio);
  }

}
