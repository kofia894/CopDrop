import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService} from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loggedUser:object;

  sliderConfig = {
    slidesPerView:1.6,
    direction: 'vertical'
  }

  constructor( private firestore:AngularFirestore, private user:UserService ) { }

 

  private data = [
    {
     

    }

   
   
  ]

  ngOnInit() {
    this.loggedUser = this.user.loggedUser;

    this.firestore.collection("personal").get().toPromise()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          this.data.push(doc.data());

          console.log(this.data);

          
      });
    
    });
  }

}
