import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {


 

  loggedUser = {
    firstname: "",
    lastname: "",
    email: "",
    birthday: "",
    location: "",
    telephone: "",
    id: ""
  };

  users = {}

  constructor(private firestore:AngularFirestore, private auth:AngularFireAuth) {
    this.auth.onAuthStateChanged(user => {
      if(user) {this.loggedUser.email = user.email}
    }).then(() => {
      this.firestore.collection('Users', ref => ref.where('email', '==', `${this.loggedUser.email}`)).get().toPromise().then(snapshot => {
        snapshot.docs.forEach(doc => {
          this.users = JSON.parse(JSON.stringify(doc.data()));
          this.loggedUser.id = doc.id;
        })
        this.loggedUser.firstname = this.users['firstname'];
        this.loggedUser.lastname = this.users['lastname'];
        this.loggedUser.email = this.users['email'];
        this.loggedUser.telephone = this.users['telephone'];
        this.loggedUser.location = this.users['location'];
      })
    })
  }

  update(newuser:object, ref) {
    this.firestore.collection('Users').doc(this.loggedUser.id).update(newuser).then(() => {
      location.href = ref;
    })
  }

}
