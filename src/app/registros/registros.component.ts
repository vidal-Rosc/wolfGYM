import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Registro } from '../models/registro';
import { Cliente } from '../models/cliente';
import { ClientesComponent } from '../clientes/clientes.component';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {
  registro: Registro = new Registro();
  ClienteSelected: Cliente = new Cliente();

  constructor(private bbdd: AngularFirestore) { }

  ngOnInit(){
  }

  asignarCliente(cliente:Cliente){
    this.registro.cliente = cliente.ref;
    this.ClienteSelected = cliente;
  }

  cancelarCliente(){
    //de esta forma eliminamos los clientes de nuestro registro
    this.ClienteSelected = new Cliente();
    this.registro.cliente = undefined;
  }

  guardar(){
    console.log();
  }
}
