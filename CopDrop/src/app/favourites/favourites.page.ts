import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FavouritesService} from '../favourites.service'

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})
export class FavouritesPage implements OnInit {

  favourites = [];
  items = [];

  sliderConfig = {
    slidesPerView:1.6,
    direction: 'vertical'
    

  }

  constructor(private favouritesservice: FavouritesService, private router: Router) { }

  ngOnInit() {
    this.favourites = this.favouritesservice.getFavourites();
    this.items = this.favouritesservice.getFavouritesData();
  }

  addToFavourites(product){
    this.favouritesservice.addFavourite(product);
  }

  openfavourites() {
    this.router.navigate(['favourites']);
  }

}
