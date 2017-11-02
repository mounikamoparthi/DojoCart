import { Component, OnInit } from '@angular/core';
import {UserService} from './../../user.service';
import {Userrecord} from './../user';
import {Router} from '@angular/router';
@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  reg_user = new Userrecord;
  constructor(private user_service: UserService, private router: Router) { }
  ngOnInit() {
  }

  registration() {
    console.log(this.reg_user );
    this.user_service.registration(this.reg_user)
    .then(() => {
      this.router.navigate(['/shoppage']);
    })
    .catch(err => console.log(err));
    // this.reg_user = new Userrecord
  }

}
