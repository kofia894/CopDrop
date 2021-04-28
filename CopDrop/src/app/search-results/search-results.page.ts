import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import {FavouritesService} from '../favourites.service'

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.page.html',
  styleUrls: ['./search-results.page.scss'],
})
export class SearchResultsPage implements OnInit {

  cart = [];
  favourites = [];
  items = [];
  items2 = [];

  sliderConfig = {
    slidesPerView:1.6,
    direction: 'vertical'
    

  }
  constructor( private favouritesservice: FavouritesService, private cartservice: CartService, private router: Router ) { }

  ngOnInit() {
    this.cart = this.cartservice.getCart();
    this.items = this.cartservice.getProducts();

    this.favourites = this.favouritesservice.getFavourites();
    this.items2 = this.favouritesservice.getFavouritesData();
  }

  addToCart(product){
    this.cartservice.addProduct(product);
  }

  addToFavourites(product){
    this.favouritesservice.addFavourite(product);
  }

  openCart() {
    this.router.navigate(['cart']);
  }

  openfavourites() {
    this.router.navigate(['favourites']);
  }

}
