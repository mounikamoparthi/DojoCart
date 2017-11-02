// import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router"
 import {UserService} from "./../user.service"
 import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,Input } from "@angular/core";
 import {ShoppingCartService} from "./../shoppingcart.service"
import {ProductInfo} from "./../bicycle"
import { Userrecord } from '.././user/user';
import { Observable } from "rxjs/Observable";
import {CartItem} from './../cart-item.model'
// import {ShoppingCartService} from "./../shoppingcart.service"
import { ShoppingCart } from "./../shoppingCart.model";
import { Subscription } from "rxjs/Subscription"; 
import { Observer } from "rxjs/Observer";
import { productService } from "./../product.service";

interface ICartItemWithProduct extends CartItem {
  product: ProductInfo;
  totalCost: number;
}
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
//  public products: Observable<Bicycle[]>;
  public cart: Observable<ShoppingCart>;
  public itemCount: number;
public title: string[];
  private cartSubscription: Subscription;
   private products: ProductInfo[];
   public cartItems: ICartItemWithProduct[];
 @Input() cartonly: boolean;
  public constructor(private shoppingCartService: ShoppingCartService,private productsService: productService,) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public ngOnInit(): void {
    
    this.cart = this.shoppingCartService.get();
    // this.cartSubscription = this.cart.subscribe((cart) => {
    //   this.title = cart.items.map((x) => x.title) 
      this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
        this.cartItems = cart.items
                           .map((item) => {
                              const product = this.products.find((p) => p.ProductName === item.title);
                              return {
                                ...item,
                                product,
                                totalCost: product.Price * item.quantity };
                           });
                              console.log("cartItems",this.cartItems)
      });
    });
  }
 

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
