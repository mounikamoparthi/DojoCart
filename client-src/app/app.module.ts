import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import {UserService} from './user.service';
import { ListingsComponent } from './listings/listings.component';
import { MylistingComponent } from './mylisting/mylisting.component';
import { FilterPipe } from './filter.pipe';
import { ShoppageComponent } from './shoppage/shoppage.component';
import { ShowprodComponent } from './showprod/showprod.component';
import { CartComponent } from './cart/cart.component';
import { NavigationComponent } from './navigation/navigation.component';
import { productService } from './product.service';
import { DeliveryOptionsDataService } from './delivery-options.service';
import {ShoppingCartService} from './shoppingcart.service';
import { LocalStorageServie, StorageService } from './storage.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { WalmartapiComponent } from './walmartapi/walmartapi.component';
import { jQueryToken } from './jQuery.Service';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    UserComponent,
    UserLoginComponent,
    UserRegisterComponent,
    ListingsComponent,
    MylistingComponent,
    FilterPipe,
    ShoppageComponent,
    ShowprodComponent,
    CartComponent,
    NavigationComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    WalmartapiComponent,
    LogoutComponent
  ],
  imports: [
        BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
    providers: [
      UserService,
     productService,
    DeliveryOptionsDataService,
    // PopulatedCartRouteGuard,
    LocalStorageServie,
    { provide: StorageService, useClass: LocalStorageServie },
    {
      deps: [StorageService,
          productService,
         DeliveryOptionsDataService],
      provide: ShoppingCartService,
      useClass: ShoppingCartService
    }
  ]
  // bootstrap: [AppComponent]
})
export class AppModule { }
