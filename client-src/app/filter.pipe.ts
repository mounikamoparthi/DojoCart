import { Pipe, PipeTransform } from '@angular/core';
import { ProductInfo } from "./bicycle";

@Pipe({
  name: 'filter',
  pure:false
})
export class FilterPipe implements PipeTransform {

  transform(bike_array: Array<ProductInfo>, searchStr: string): Array<ProductInfo> {
    // if((searchStr=null))
    //   {
    //     searchStr = ""
    //   }
    //   else{
    
    //   }

      searchStr=searchStr.toLowerCase();
    return bike_array.filter(bike => {
      return bike.ProductName.toLowerCase().includes(searchStr) || bike.ProductName.toLowerCase().includes(searchStr)
    })
  }

}
