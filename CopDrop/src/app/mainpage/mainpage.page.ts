import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import {ModalSettingsComponent} from '../components/modal-settings/modal-settings.component'
import {CartService} from '../cart.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {
  slideOpts = {
    spaceBetween:10,
    centeredSlides: true,
    slidesPerView:1.6,
    direction: 'horizontal'
    
  };
fromModal:any;
  constructor(private modalCtrl: ModalController, private routerOutlet:IonRouterOutlet,private auth: AngularFireAuth,private firestore:AngularFirestore) { }

  private data = [
    {
     

    }

   
   
  ]

  

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

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ModalSettingsComponent,
      // componentProps:{
      //      "Brand": "brand",
      //      "Size" : "shoe-size",
      //      "describe" : "description"
      // },
      cssClass:'my-modal-css',
      backdropDismiss:true,
      presentingElement: await this.modalCtrl.getTop()
    })

    //getting data from modal
    modal.onDidDismiss().then((data:any)=>{
      this.fromModal=data;
    })
   return await modal.present()
 
  }

  logOut() {
    this.auth.signOut()
      .then(() => {
        location.href = "/home";
      })
  }

 

}
