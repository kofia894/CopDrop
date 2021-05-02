import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private data = [
    {
     

    }

   
   
  ]

  private cart = [];

  constructor(private firestore:AngularFirestore) { }

  ngOnInit() {

    this.firestore.collection("Shoes").get().toPromise()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.data.push(doc.data());

          console.log(this.data);

          
      });
    
    });
  }

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
