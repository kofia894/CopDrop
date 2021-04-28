import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
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

  private cart = [];

  constructor() { }

  getProducts() {
    return this.data;
  }

  getCart(){
    return this.cart;
  }

  addProduct(product){
    this.cart.push(product);
  }

  clearCart(){
    this.cart.splice(0, this.cart.length);
  }

 
}
