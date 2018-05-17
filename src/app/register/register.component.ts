import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {UploadServiceService} from '../upload.service';
import {AccountAuthService} from '../account-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public error: any;
  constructor(private userService: UserService, private router: Router, private accountAuthService: AccountAuthService) { }

  ngOnInit() {
  }

  createAccount(email, password, event) {
    this.accountAuthService.createAccount(email, password).
    then((e) => {

      this.router.navigate(['/accountSetup']);
    }).catch((error) => {
      this.error = error;
    });
  }
}
