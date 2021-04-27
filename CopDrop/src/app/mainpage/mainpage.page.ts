import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import {ModalSettingsComponent} from '../components/modal-settings/modal-settings.component'

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.page.html',
  styleUrls: ['./mainpage.page.scss'],
})
export class MainpagePage implements OnInit {
fromModal:any;
  constructor(private modalCtrl: ModalController, private routerOutlet:IonRouterOutlet) { }

  ngOnInit() {
  }

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: ModalSettingsComponent,
      componentProps:{
           "name": "CopDrop",
           "id" : "final"
      },
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

 

}
