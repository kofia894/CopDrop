import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  firstname:string = '';
  lastname: string = '';
  telephone:string = '';
  location:string = '';
  email:string = '';
  password: string = '';
  repassword: string = '';
  attempts: number = 0;

  // Regex & Validation
password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
email_regex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

// User details validation
firstname_valid:boolean = false;
lastname_valid:boolean = false;
email_valid:boolean = false;
password_valid:boolean = false;
repassword_valid:boolean = false;
telephone_valid:boolean = false;
location_valid:boolean = false;

  constructor( private auth: AngularFireAuth, private firestore: AngularFirestore ) { }

  ngOnInit() {
  }
  createAccount() {
    this.attempts = this.attempts + 1;

    if(this.firstname.length > 3 && this.firstname.length < 20) {
      this.firstname_valid = true;
    } else {this.firstname_valid = false;}

    if(this.repassword === this.password) {
      this.repassword_valid = true;
    }else {this.repassword_valid = false}

    this.password_valid = this.password_regex.test(this.password);

    this.email_valid = this.email_regex.test(this.email)

    if(this.lastname.length > 3 && this.lastname.length < 20) {
      this.lastname_valid = true;
    }else {this.lastname_valid = false}

    if(this.telephone.length == 10) {
      this.telephone_valid = true;
    }else {this.telephone_valid = false}

    if(this.location.length > 3 && this.location.length < 30) {
      this.location_valid = true;
    }else {this.location_valid = false}

    if(this.firstname_valid && this.lastname_valid && this.email_valid && this.password_valid && this.telephone_valid && this.location_valid && this.repassword_valid) {
      console.log("Before Letting user");
      let user = {
        
        firstname: this.firstname,
        lastname: this.lastname,
        telephone: this.telephone,
        location: this.location,
        email: this.email,
      }
      console.log("After letting user");

      this.firestore.collection("Users").add(user)
      .then (()=> {
        console.log("After Adding user");
        this.auth.createUserWithEmailAndPassword(this.email, this.password)
        console.log("Create user with email and pass");
      })
      .then(()=> {
        console.log("Done");
        location.href = '/home';

      })

    }
  }
}



