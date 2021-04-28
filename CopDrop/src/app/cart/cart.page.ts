import { Component, OnInit } from '@angular/core';
import {CartService} from '../cart.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  sliderConfig ={
    spaceBetween:3,
    centeredSlides: true,
    slidesPerView:1.2

  }
  selectedItems = [];
  total = 0;
  constructor(private cartService: CartService) { }

  ngOnInit() {
    let items = this.cartService.getCart();
    let selected = {};

    for (let obj of items){
      if(selected[obj.id]){
        selected[obj.id].count++;
      }else{
        selected[obj.id] = {...obj, count: 1};
        // ...obj stands for the name,id and price
        // count:1 = giving it a count of 1
      }
    }
    this.selectedItems = Object.keys(selected).map(key => selected [key])
    this.total = this.selectedItems.reduce((a,b) => a + (b.count * b.price), 0);
  }

  clearCart(){
    this.cartService.clearCart();
    setTimeout(()=>{
      window.location.reload();
    }, 100);
}

}
