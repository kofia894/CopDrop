import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

import { AngularFirestore } from '@angular/fire/firestore';

import {SearchService} from '../search.service'




@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

  shoes = [];
  
  cart = [];
  favourites = [];
  items = [];
  items2 = [];
  brand:any;
  

  slideOpts = {
    spaceBetween:10,
    centeredSlides: true,
    slidesPerView:1.6,
    direction: 'horizontal'
    
  };


  constructor(  private cartservice: CartService, private router: Router, 
              private searchservice: SearchService, private firestore: AngularFirestore) { }

  ngOnInit() {

    this.firestore.collection("Shoes").get().toPromise()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.shoes.push(doc.data());

          console.log(this.shoes);

          
      });
    
    });
   
    this.brand = this.searchservice.getBrand();


    this.cart = this.cartservice.getCart();
    this.items = this.cartservice.getProducts();

   
  }

  addToCart(product){
    this.cartservice.addProduct(product);
  }

 

  openCart() {
    this.router.navigate(['cart']);
  }

  openfavourites() {
    this.router.navigate(['favourites']);
  }

  

}
