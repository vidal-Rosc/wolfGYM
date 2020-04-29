import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  datosCorrectos: boolean = true;
  mensajeError: string = '';
  constructor(private creadorFormulario: FormBuilder, private auth_: AngularFireAuth,
    private spinner: NgxSpinnerService) { }

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
//login
  acceder() {
    if (this.loginForm.valid) {
      this.datosCorrectos = true;
      this.spinner.show();
      this.auth_.signInWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password)
        .then((usuario) => {
          console.log(usuario)
          this.spinner.hide();
        }).catch((error) => {
          this.datosCorrectos = false;
          this.mensajeError = error.message;
          this.spinner.hide();
        })
    } else {
      this.datosCorrectos = false;
    }
  }
}
