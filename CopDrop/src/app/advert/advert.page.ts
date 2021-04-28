import { Component, Input, OnInit } from '@angular/core';

import { Camera, DestinationType} from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { sanitizeIdentifier } from '@angular/compiler';
import { AlertController } from '@ionic/angular'

@Component({
  selector: 'app-advert',
  templateUrl: './advert.page.html',
  styleUrls: ['./advert.page.scss'],
})
export class AdvertPage implements OnInit {

  brand:string = "";
size:string="";
desc:string="";

// Brand:any;
// Ssize:any;
// Descp:any;



  constructor(private firestore:AngularFirestore, private camera: Camera,public alertController: AlertController) { }

  imgURL;

  ngOnInit() {}

  async presentAlert() {
    const alert = await this.alertController.create({
      // cssClass: 'my-custom-class',
      header: 'Advert',
      message: 'Your Shoe is now on sale ! ',
      buttons: ['OK']
    });

    await alert.present();
  }

  Save(){
    let Shoe = {
      brand:this.brand,
      description:this.desc,
      size:this.size,
    }
    this.firestore.collection("Shoes").add(Shoe)
    .then(()=> {
      
      
      console.log("Done");
      
      location.href = '/mainpage';

    })

    this.presentAlert()
  

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