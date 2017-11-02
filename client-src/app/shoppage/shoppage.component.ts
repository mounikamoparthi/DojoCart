import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router" 
 import {UserService} from "./../user.service"
import {ProductInfo} from "./../bicycle"
import { Userrecord } from '.././user/user';
import { Observable } from "rxjs/Observable";
import {ShoppingCartService} from "./../shoppingcart.service"
import { ShoppingCart } from "./../shoppingCart.model";
import { Subscription } from "rxjs/Subscription"; 
import { Observer } from "rxjs/Observer";


@Component({
  selector: 'app-shoppage',
  templateUrl: './shoppage.component.html',
  styleUrls: ['./shoppage.component.css']
})
export class ShoppageComponent implements OnInit  {
  newBike: ProductInfo = new ProductInfo();
  searchStr = ''
  productName = ''
  allBikes: Array<ProductInfo>;
   public cart: Observable<ShoppingCart>;
private cartSubscription: Subscription;
  public itemCount: number;
  constructor(private user_service : UserService, private router:Router,public shoppingCartService: ShoppingCartService) { }
//  private cartSubscription: Subscription;
  ngOnInit() {
    this.getAllBikes()

    this.cart = this.shoppingCartService.get();
    // this.cartSubscription = this.cart.subscribe((cart) => {
    //   this.title = cart.items.map((x) => x.title) 
      this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
  }

    getAllBikes() {
    this.user_service.getAllBikes()
    .then((bikes) => { this.allBikes = bikes; })
    .catch((err) => { console.log(err); });
  }

  chooseProduct(bicyle: ProductInfo){
    console.log("bicyle.ProductName",bicyle.ProductName);
    this.router.navigate(['/product', bicyle.ProductName]);
  }

}
