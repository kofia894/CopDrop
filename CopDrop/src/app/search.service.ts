import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  brand:any;

  constructor() { }

  setBrand(b){
    this.brand=b;

  }

  getBrand(){
    return this.brand;
  }

}
