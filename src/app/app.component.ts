import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wolfGYM';
  usuario: User;
  cargando: boolean = true;

  constructor(public auth: AngularFireAuth) {
    this.auth.user.subscribe((user)=>{
      //Giving realness of login. :)
      setTimeout(()=>{
        this.cargando = false;
        this.usuario = user;
        console.log(user);
      }, 1000);
    })
  }
  login() {
    /*This would be the method to access with google account
    this.auth.signInWithPopup(new auth.GoogleAuthProvider());*/
    this.auth.signInWithEmailAndPassword('pepeperez@hotmail.com','123456');
  }
  logout() {
    this.auth.signOut();
  }
}

