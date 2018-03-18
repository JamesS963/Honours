import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public error: any;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  createAccount(email, password) {
    this.userService.createAccount(email, password).
    then((e) => {this.router.navigate(['/accountSetup']); })
      .catch((error) => {
      this.error = error;
    });
  }
}
