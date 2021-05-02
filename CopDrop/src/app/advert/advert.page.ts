import { Component, Input, OnInit } from '@angular/core';

import { Camera, DestinationType,CameraOptions} from '@ionic-native/camera/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { sanitizeIdentifier } from '@angular/compiler';
import { AlertController, LoadingController, NavController } from '@ionic/angular'
import firebase from 'firebase/app'
import { HomePage } from '../home/home.page';
// import * as firebase from 'firebase'

@Component({
  selector: 'app-advert',
  templateUrl: './advert.page.html',
  styleUrls: ['./advert.page.scss'],
})
export class AdvertPage implements OnInit {

  brand:string = "";
  size:string="";
  desc:string="";
  price:string="";
  contact:string="";
  name:string ="";
  shoename:string="";
  location:string="";

public static URL;
imgURL;
selectedPhoto;
public static loading;


  constructor(private firestore:AngularFirestore, private camera: Camera,
              public alertController: AlertController,public navctrl:NavController, public loadingCtrl: LoadingController) { 
                !firebase.apps.length?firebase.initializeApp(firebase):firebase.app();
              }

 

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
      price:this.price,
      contact:this.contact,
      name:this.name ,
      ShoeName:this.shoename,
      location: this.location
    }
    this.firestore.collection("personal").add(Shoe)
    this.firestore.collection("Shoes").add(Shoe)
    .then(()=> {
      
      
      console.log("Done");
      
      location.href = '/mainpage';

    })

    this.presentAlert()
  

    console.log(Shoe)
    // console.log(this.Brand,this.Ssize,this.Descp)

  }

  takeImage(){
    const options:CameraOptions={
      quality:100,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum:false,
      allowEdit: true,
      targetHeight:300,
      targetWidth:300
    }
    this.camera.getPicture(options).then((imageData)=>{
      this.selectedPhoto=this.dataURLtoBlob('data:image/jpeg;base64,'+ imageData)
      this.upload()
    },(err)=>{
      console.log('error',err);
    }
    );
  }

  dataURLtoBlob(dataURL){
    let binary=atob(dataURL.split(',')[1]);
    let array =[];
    for(let i=0;i<binary.length; i++){
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type:'image/jpeg'});
  };  

  async upload(){
    AdvertPage.loading = await this.loadingCtrl.create({
      message: 'uploading.....'
    })
    await HomePage.loading.present();

    if (this.selectedPhoto){
      var uploadtask = firebase.storage().ref().child('myImage.png')
      .put(this.selectedPhoto);
      uploadtask.then(this.onSuccess, this.onError);
    }
  }

  onSuccess = snapshot => {
    snapshot.ref.getDownloadURL().then(function(downloadURL){
      HomePage.URL = downloadURL;
      HomePage.loading.dismiss();
    });
    this.imgURL = HomePage.URL;
  };
 
  onError = error => {
    console.log('error', error)
  };
  

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