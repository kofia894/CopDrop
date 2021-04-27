import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, DestinationType} from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.scss'],
})
export class ModalSettingsComponent implements OnInit {

@Input() name:string;  
@Input() id:string;


  constructor( private modalCtrl: ModalController, private camera: Camera) { }

    imgURL;
  ngOnInit() {}

  dismiss(){
    this.modalCtrl.dismiss({

    //getting data from modal
    "fromModal":"data"
    })

  }

  getCamera(){
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.CAMERA,
      destinationType:this.camera.DestinationType.DATA_URL
      
    }).then((res)=>{
     
      this.imgURL =  'data:image/jpeg;base64,' +  res;
    }).catch(e=>{
      console.log(e);
    })

  }

  getGallery(){
    this.camera.getPicture({
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType:this.camera.DestinationType.DATA_URL
      
    }).then((res)=>{
     
      this.imgURL = 'data:image/jpeg;base64,' + res;
    }).catch(e=>{
      console.log(e);
    })

  }

}
