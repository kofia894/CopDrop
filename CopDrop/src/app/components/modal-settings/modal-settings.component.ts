import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.scss'],
})
export class ModalSettingsComponent implements OnInit {

@Input() name:string;  
@Input() id:string;


  constructor( private modalCtrl: ModalController) { }

    imgURL;
  ngOnInit() {}

  dismiss(){
    this.modalCtrl.dismiss({

    //getting data from modal
    "fromModal":"data"
    })

  }

  getCamera(){
    
  }

}
