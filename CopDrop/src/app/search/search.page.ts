import { Component, OnInit } from '@angular/core';
import {SearchService} from '../search.service'

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  brand:any

  constructor( private searchservice: SearchService) {}

  ngOnInit() {
  }

  fetchNike(){
    this.brand="Nike"
    this.searchservice.setBrand(this.brand)

  }

  fetchAd(){
    this.brand="Adidas"
    this.searchservice.setBrand(this.brand)
    
  }

  fetchUA(){
    this.brand="Under armour"
    this.searchservice.setBrand(this.brand)
    
  }

  fetchNB(){
    this.brand="New Balance"
    this.searchservice.setBrand(this.brand)
    
  }

  fetchPm(){
    this.brand="Puma"
    this.searchservice.setBrand(this.brand)
    
  }

  fetchCV(){
    this.brand="Converse"
    this.searchservice.setBrand(this.brand)
    
  }

  

}
