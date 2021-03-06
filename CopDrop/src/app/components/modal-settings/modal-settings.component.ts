import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, DestinationType} from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { sanitizeIdentifier } from '@angular/compiler';

@Component({
  selector: 'app-modal-settings',
  templateUrl: './modal-settings.component.html',
  styleUrls: ['./modal-settings.component.scss'],
})
export class ModalSettingsComponent implements OnInit {

// @Input() name:string;  
// @Input() id:string;

brand:string = "";
size:string="";
desc:string="";

// Brand:any;
// Ssize:any;
// Descp:any;



  constructor( private modalCtrl: ModalController, private camera: Camera) { }

  imgURL;

  ngOnInit() {}

  dismiss(){
    this.modalCtrl.dismiss(
    )

  }

  Save(){
    // this.modalCtrl.dismiss({
    //   // "Brand":this.brand,
    //   // "Ssize":this.size,
    //   // "Descp":this.desc
      
    // // this.firestore.collection("Shoes").add(Shoe)
    // })
    

    let Shoe = {
      brand:this.brand,
      description:this.desc,
      size:this.size,
      
      
    }

    console.log(Shoe)
    // console.log(this.Brand,this.Ssize,this.Descp)

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
