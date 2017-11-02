import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { DeliveryOption } from "./delivery-option.model";
import { CachcingServiceBase } from "./caching.service";
import {ProductInfo} from "./bicycle"

@Injectable()
export class productService extends CachcingServiceBase {
  private products: Observable<ProductInfo[]>;

  public constructor(private http: Http) {
    super();
  }

  public all(): Observable<ProductInfo[]> {  
    return this.cache<ProductInfo[]>(() => this.products,
                                        (val: Observable<ProductInfo[]>) => this.products = val,
                                        () => this.http
                                                  .get("/getAllBikes")
                                                  .map((response) => response.json()
                                                                             .map((item) => {
                                                                                let model = new ProductInfo();
                                                                                model.updateFrom(item);
                                                                                return model;
                                                                              })));

  }
                                                                            
}
