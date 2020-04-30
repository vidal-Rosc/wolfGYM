import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.scss']
})
export class AddClientesComponent implements OnInit {
  clientesFormulario: FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit(){
    this.clientesFormulario = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      foto: ['', Validators.required],
    })
  }

  agregar(){
    console.log(this.clientesFormulario.value)
  }
}
