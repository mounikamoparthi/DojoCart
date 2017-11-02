import { Component, OnInit } from '@angular/core';
import { Userrecord } from "../user/user";
import { UserService } from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
user: Userrecord;
  constructor(private user_service: UserService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
      console.log("logging out..");
      // this.user_service.logout();
    this.router.navigate(['']);
  }

}
