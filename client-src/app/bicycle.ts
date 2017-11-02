import { Userrecord } from "././user/user";

export class ProductInfo {
    public ProductName: string = '';
    public Description: string = '';
    public Price: number = null;
    public Imageurl: string = null;
    // public CreatedAt: Date;
    // public UpdatedAt: Date;
    public UserId: number = null;
     
  public updateFrom(src: ProductInfo): void {
    this.ProductName = src.ProductName;
     
    this.Description = src.Description;
    this.Price = src.Price;
     this.Imageurl=src.Imageurl;
    
  }
}