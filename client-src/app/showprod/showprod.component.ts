import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from "@angular/router"
 import {UserService} from "./../user.service"
 import {ShoppingCartService} from "./../shoppingcart.service"
import {ProductInfo} from "./../bicycle"
import { Userrecord } from '.././user/user';
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { ShoppingCart } from "./../shoppingCart.model";
import { Subscription } from "rxjs/Subscription"; 

@Component({
  selector: 'app-showprod',
  templateUrl: './showprod.component.html',
  styleUrls: ['./showprod.component.css']
})
export class ShowprodComponent implements OnInit {
  newBike: ProductInfo = new ProductInfo();
  product_title =" "
   product = new ProductInfo
  allBikes: Array<ProductInfo>;
  cartonly
  public cart: Observable<ShoppingCart>;
private cartSubscription: Subscription;
  public itemCount: number;

  constructor(private _route: ActivatedRoute,private user_service : UserService, private router:Router,
   private shoppingCartService: ShoppingCartService) { 
         this._route.params.subscribe((param)=>{
      this.product_title = param.title
  })
  }
 ngOnInit() {
   this.getProduct()
       this.cart = this.shoppingCartService.get();
    // this.cartSubscription = this.cart.subscribe((cart) => {
    //   this.title = cart.items.map((x) => x.title) 
      this.cartSubscription = this.cart.subscribe((cart) => {
      this.itemCount = cart.items.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    });
     
 }

   getProduct(){
    this.user_service.getOneProduct(this.product_title).then((product)=>{
        console.log("got product")
        this.product = product
         
        console.log(this.product)
      }).catch((err)=>{
        console.log(err)
      })
  }

       public addProductToCart(product: ProductInfo): void {
         console.log("add cart prodtc",product)
    this.shoppingCartService.addItem(product, 1);
  }

  public removeProductFromCart(product: ProductInfo): void {
    this.shoppingCartService.addItem(product, -1);
  }

  public productInCart(product: ProductInfo): boolean {
    return Observable.create((obs: Observer<boolean>) => {
     
      const sub = this.shoppingCartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.title === product.ProductName));
                        obs.complete();
                      });
      // sub.unsubscribe();
    });
  }
        
   

}
