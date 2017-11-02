import { Injectable } from '@angular/core';
import {Http} from "@angular/http"
import {Userrecord} from "./user/user"
import {ProductInfo} from "./bicycle"
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import "rxjs"
import { StorageService } from "./storage.service";
import { ShoppingCart } from "./shoppingCart.model";
import { CartItem } from "./cart-item.model";
import { DeliveryOptionsDataService } from "./delivery-options.service";
import { productService } from "./product.service";
 import { DeliveryOption } from "./delivery-option.model";

const CART_KEY = "cart";
@Injectable()
export class ShoppingCartService {
     myCart:any[]=[];
     private storage: Storage;
     private subscriptionObservable: Observable<ShoppingCart>;
     private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: ProductInfo[];
  private deliveryOptions: DeliveryOption[];

  public  constructor(private storageService: StorageService,private productservice:productService,
                      private deliveryOptionsService: DeliveryOptionsDataService) { 
   this.storage = this.storageService.get(); 
 
    this.productservice.all().subscribe((products) => this.products = products);
    this.deliveryOptionsService.all().subscribe((options) => this.deliveryOptions = options);
   this.subscriptionObservable = new Observable<ShoppingCart>((observer: Observer<ShoppingCart>) => {
      this.subscribers.push(observer);
      observer.next(this.retrieve());
      return () => {
        this.subscribers = this.subscribers.filter((obs) => obs !== observer);
      };
    });
   }
 
  private retrieve(): ShoppingCart {
    const cart = new ShoppingCart();
    const storedCart = this.storage.getItem(CART_KEY);
    console.log("storedCart",storedCart)
    if (storedCart) {
      cart.updateFrom(JSON.parse(storedCart));
    }
    console.log("cart",cart)
    return cart;
  }
  public get(): Observable<ShoppingCart> {
    return this.subscriptionObservable;
  }

    public empty(): void {
    const newCart = new ShoppingCart();
    this.save(newCart);
    this.dispatch(newCart);
  }

 
   public addItem(product: ProductInfo, quantity: number): void {
    const cart = this.retrieve();
    console.log("product.ProductName")
    // console.log("product.productName",product.productName)
    let item = cart.items.find((p) => p.title === product.ProductName);
    if (item === undefined) {
      item = new CartItem();
      item.title = product.ProductName;
      item.Imageurl = product.Imageurl;
      cart.items.push(item);
    }

    item.quantity += quantity;
    cart.items = cart.items.filter((cartItem) => cartItem.quantity > 0);
    if (cart.items.length === 0) {
      cart.deliveryOptionId = undefined;
    }

    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }
  public setDeliveryOption(deliveryOption: DeliveryOption): void {
    const cart = this.retrieve();
    cart.deliveryOptionId = deliveryOption.id;
    this.calculateCart(cart);
    this.save(cart);
    this.dispatch(cart);
  }

 private calculateCart(cart: ShoppingCart): void {
  //  cart.itemsTotal ==1000;
    cart.itemsTotal = cart.items
                          .map((item) => item.quantity * this.products.find((p) => p.ProductName === item.title).Price)
                          .reduce((previous, current) => previous + current, 0);
     cart.deliveryTotal = cart.deliveryOptionId ?
                          this.deliveryOptions.find((x) => x.id === cart.deliveryOptionId).price :
                          0;
    cart.grossTotal = cart.itemsTotal + cart.deliveryTotal;
  }

    private save(cart: ShoppingCart): void {
    this.storage.setItem(CART_KEY, JSON.stringify(cart));}

     private dispatch(cart: ShoppingCart): void {
    this.subscribers
        .forEach((sub) => {
          try {
            sub.next(cart);
          } catch (e) {
            // we want all subscribers to get the update even if one errors.
          }
        });
  }
  }

    


