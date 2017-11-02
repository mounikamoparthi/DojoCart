import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
 import {UserService} from './../user.service';
import {ProductInfo} from './../bicycle';
import { Userrecord } from '.././user/user';
@Component({
  selector: 'app-mylisting',
  templateUrl: './mylisting.component.html',
  styleUrls: ['./mylisting.component.css']
})
export class MylistingComponent implements OnInit {
// login_user = new User
  newBike: ProductInfo = new ProductInfo();
  hasImage: boolean = false;
  myBikes: Array<ProductInfo>;
  constructor(private user_service: UserService, private router: Router) { }

  ngOnInit() {
    // this.getBikes()
     this.getAllBikes();
  }

  getBikes() {
    this.user_service.getAllUserBikes()
    .then((bikes) => { this.myBikes = bikes; })
    .catch((err) => { console.log(err); });
  }
  getAllBikes() {
    this.user_service.getAllBikes()
    .then((bikes) => {
        console.log('myBikes');
        this.myBikes = bikes;
            console.log(this.myBikes);
      })
    .catch((err) => { console.log(err); });
  }

  addBike() {
    console.log(this.newBike);
    this.newBike.UserId = 18;
    this.user_service.addBike(this.newBike)
    .then(() => { this.getAllBikes(); })
    .catch((err) => { console.log(err); });
  }

 updateBike(idx) {   this.user_service.updateBike(this.myBikes[idx])
    .then(() => { this.getAllBikes(); })
    .catch((err) => { console.log(err); });
  }

 deleteBike(idx) {   this.user_service.deleteBike(this.myBikes[idx])
    .then(() => { this.getAllBikes(); })
    .catch((err) => { console.log(err); });
  }

  // public addProductToCart(bicycle: Bicycle): void {
  //   this.user_service.addItem(bicycle, 1);
  // }

  // public removeProductFromCart(bicycle: Bicycle): void {
  //   this.user_service.addItem(bicycle, -1);
  // }
}
