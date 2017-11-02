import { Component, Inject, OnInit } from '@angular/core';
// import * as $ from 'jquery';
import {Http, Headers} from '@angular/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-walmartapi',
  templateUrl: './walmartapi.component.html',
  styleUrls: ['./walmartapi.component.css']
})
export class WalmartapiComponent implements OnInit {
public items;
  constructor(public http: Http) {

    }

  ngOnInit() {

    console.log("In walmartAPI********");
  }
  // tslint:disable-next-line:use-life-cycle-interface

    goNow(value: any ) {
      var queryHead = 'http://api.walmartlabs.com/v1/search?apiKey=st4yc9x9nza7wgfpxz6gctju&query=';
      var fullURL = queryHead + value.query + '&format=json&callback';
      console.log(value);
      this.http.get(fullURL).map(x => x.json()).subscribe(x => {this.items = x.items; console.log(x.items);} );

    }

// $(document).ready( function () {
// console.log("In walmartAPI********");
// // Clicking Submit button (id = "goNow") kicks off function for Wal-Mart API
//   $('#goNow').click(function () {
//     // Prevent form from submitting data so we can capture the values input in to the fields.
//     event.preventDefault();

//   // set variables to append to URL from form on index.html
// console.log("object");
//     var myQuery = $('#query').val();
//     var minRange = $('#minRange').val();
//     var maxRange = $('#maxRange').val();
//     var showData = $('#show-data');

//   // If Else statement to use conditional logic for which URL feature to use contingent on which fields are completed.
//    if ($('#minRange').val() !== '') {
//     // use this URL if their is a value in minRange (logic not foolproof, but for demo purposes it works.)
//     var theJSON = 'http://api.walmartlabs.com/v1/search?apiKey=st4yc9x9nza7wgfpxz6gctju&query=' + myQuery +
//     '&facet=on&facet.range=price: [' + minRange + ' TO ' + maxRange + ']&format=json&callback=?';
//    } else {
//   // use this URL if minRange is empty
//     var theJSON = 'http://api.walmartlabs.com/v1/search?apiKey=st4yc9x9nza7wgfpxz6gctju&query=' + myQuery + '&format=json&callback=?';
//    }
//   // get JSON from the Wal-Mart API URL
//     $.getJSON(theJSON, function (json) {
//       // view the returned data in the console.
//       console.log(json);
//       console.log(theJSON);

//   // console.log names of all items
//       $.each(json.items, function(key, value) {
//         console.log(value.name);
//         });

//   // get JSON Object name, salePrice, itemId customerRating and largeImage for injecting in Divs below from products 1-3 (Array 0-2)

//       var name = json.items[0].name;
//       console.log('Product Name: ', name);

//       var price = json.items[0].salePrice;
//       console.log('Sale Price: ', price);

//       var itemId = json.items[0].itemId;
//       console.log('ItemId: ', itemId);

//       var rating = json.items[0].customerRating;
//       console.log('Customer Rating: ', rating);

//       var image = json.items[0].largeImage;
//       console.log('Thumbnail Image: ', image);

//   // inject values above in to respective div elements below
//       $('div#name').text(name);
//       $('div#price').text('$' + price);
//       $('div#itemId').text(itemId);
//       $('div#rating').text(rating);
//       $('img#image').attr('src', image);

//    // Do same for second product
//       var name = json.items[1].name;
//       console.log('Product Name: ', name);

//       var price = json.items[1].salePrice;
//       console.log('Sale Price: ', price);

//       var itemId = json.items[1].itemId;
//       console.log('ItemId: ', itemId);

//       var rating = json.items[1].customerRating;
//       console.log('Customer Rating: ', rating);

//       var image = json.items[1].largeImage;
//       console.log('Thumbnail Image: ', image);

//       $('div#name1').text(name);
//       $('div#price1').text('$' + price);
//       $('div#itemId1').text(itemId);
//       $('div#rating1').text(rating);
//       $('img#image1').attr('src', image);

//   // Do same for third product
//       var name = json.items[2].name;
//       console.log('Product Name: ', name);

//       var price = json.items[2].salePrice;
//       console.log('Sale Price: ', price);

//       var itemId = json.items[2].itemId;
//       console.log('ItemId: ', itemId);

//       var rating = json.items[2].customerRating;
//       console.log('Customer Rating: ', rating);

//       var image = json.items[2].largeImage;
//       console.log('Thumbnail Image: ', image);

//       $('div#name2').text(name);
//       $('div#price2').text('$' + price);
//       $('div#itemId2').text(itemId);
//       $('div#rating2').text(rating);
//       $('img#image2').attr('src', image);

// // Once all data is received, then display div elements above.
//       $('div').removeClass('hidden');

//     });
//   });
// });

}


