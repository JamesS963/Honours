import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import {AccountAuthService} from '../account-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private userService: AccountAuthService, private router: Router) { }

  ngOnInit() {
  }
  // attempts to login the user.
  login(email, password) {
    this.userService.login(email, password).then((success) => {
      this.router.navigate(['/']);
    });
  }

}
