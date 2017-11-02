import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import {CartItem} from './../cart-item.model'
import {DeliveryOption} from './../delivery-option.model'
import {ProductInfo} from "./../bicycle"
import {ShoppingCart} from './../shoppingCart.model'
import { DeliveryOptionsDataService } from "./../delivery-options.service";
import { productService } from "./../product.service";
import { ShoppingCartService } from "./../shoppingcart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import {Router} from "@angular/router" 

interface ICartItemWithProduct extends CartItem {
  product: ProductInfo;
  totalCost: number;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public deliveryOptions: Observable<DeliveryOption[]>;
  public cart: Observable<ShoppingCart>;
  public cartItems: ICartItemWithProduct[];
  public itemCount: number;

  private products: ProductInfo[];
  private cartSubscription: Subscription;

  public constructor(private productsService: productService,
                     private deliveryOptionService: DeliveryOptionsDataService,
                     private shoppingCartService: ShoppingCartService, private router:Router) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

    public emptyCartcheckout(): void {
        this.shoppingCartService.empty();
       this.router.navigate(['/confirmed']);
      

  }

  public setDeliveryOption(option: DeliveryOption): void {
    this.shoppingCartService.setDeliveryOption(option);
  }

  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionService.all();
    this.cart = this.shoppingCartService.get();
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
