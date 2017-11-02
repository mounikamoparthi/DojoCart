import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router" 
 import {UserService} from "./../user.service"
import {ProductInfo} from "./../bicycle"
import { Userrecord } from '.././user/user';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {
  newBike: ProductInfo = new ProductInfo();
   
  allBikes: Array<ProductInfo>;
  constructor(private user_service : UserService, private router:Router) { }

  ngOnInit() {
    this.getAllBikes()
  }

    getAllBikes() {
    this.user_service.getAllBikes()
    .then((bikes) => { this.allBikes = bikes; })
    .catch((err) => { console.log(err); });
  }

}
