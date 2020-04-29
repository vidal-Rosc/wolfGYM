import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  datosCorrectos: boolean = true;
  mensajeError: string = '';
  constructor(private creadorFormulario: FormBuilder, private auth_: AngularFireAuth) { }

  ngOnInit() {
    this.crearFormulario()
  }


  crearFormulario() {
    // this.loginForm = new FormGroup({
    //   email: new FormControl(),
    //   password: new FormControl(),
    //    })
    this.loginForm = this.creadorFormulario.group({
      email: ['', Validators.compose([
              Validators.required, Validators.email
      ])],
      password: ['', Validators.compose([
              Validators.required, Validators.minLength(6)
      ])],
    })

  }


  acceder() {
    if (this.loginForm.valid) {
      this.datosCorrectos = true;
      this.auth_.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
        .then((usuario) => {
          console.log(usuario)
        }).catch((error)=>{
          this.datosCorrectos = false;
          this.mensajeError = error.message;
        })
    } else {
      this.datosCorrectos = false;
    }
  }
}
