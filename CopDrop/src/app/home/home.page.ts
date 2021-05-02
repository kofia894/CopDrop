import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import {auth}  from 'firebase/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email: string= ""
  password: string= ""
  isSuccess:boolean = false;
  attempts:number = 5;
  isDisable:boolean = false;
  errMessage:string = '';
  static loading: any;
  static URL: any;

  constructor(private auth: AngularFireAuth) {}

  ngOnInit(){
    this.auth.onAuthStateChanged(user => {
      if(user) {
        location.href = '/mainpage';
      }
    });

    console.log(this.auth)

  }

  login() {
    if(this.attempts > 0) {
      this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        this.isSuccess = true;
        location.href = '/mainpage';
      })
      .catch(err => {
        this.attempts = this.attempts - 1;
        this.isSuccess = false;
        this.errMessage = err.message;
      })
    } else {
      this.errMessage = "Try again in 10s";
      this.isDisable = true;
      setTimeout(()=> {
        this.isDisable = false;
        this.email = null;
        this.password = null;
        this.attempts = 5;
      }, 10000)
    }

  }

}
