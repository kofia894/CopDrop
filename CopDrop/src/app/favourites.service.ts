import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private data = [
    {
      category: 'breakfast',
      expanded: true,
      products: [
        { id:0, name: 'oatmeal', price: '8'},
        { id:1, name: 'cereal', price: '5'},
        { id:2, name: 'pancakes', price: '9'},
        { id:3, name: 'waffles', price: '7'}
      ]

    }

   
   
  ]

  private favourites = [];


  constructor() { }

  getFavouritesData() {
    return this.data;
  }

  getFavourites(){
    return this.favourites;
  }

  addFavourite(product){
    this.favourites.push(product);
  }

  clearFavourites(){
    this.favourites.splice(0, this.favourites.length);
  }
}
