import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';


@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[]= new Array<Cliente>();
  @Input('nombre') nombre: string;
  @Output('clienteSeleccionado') clienteSeleccionado = new EventEmitter();
  @Output('clienteCancelado') clienteCancelado = new EventEmitter();

  constructor(private bbdd: AngularFirestore) { }

  ngOnInit(){
    this.bbdd.collection<any>('clientes').get().subscribe((response)=>{
      this.clientes.length= 0 //para eliminar duplicados.
      response.docs.forEach((item)=>{
        //cliente es de tipo any,porque en data no viene el ID y en nuestro modelo
        //esta definido.
        let cliente: any = item.data();
        //definimos ahora el ID
        cliente.id = item.id;
        //y la ref tambien.
        cliente.ref = item.ref;

        cliente.visible = false;
        this.clientes.push(cliente);
      })
    })

  }
  //Recorremos el arreglo de clientes, si uno coincide con nombre
  //lo hacemos visible = true;
  buscarCliente(nombre: string){
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(nombre.toLowerCase())){
        cliente.visible = true;
      } else {
        cliente.visible = false;
      }
    })
  }

  seleccionarCliente(cliente:Cliente){
    this.nombre = cliente.nombre + ' ' + cliente.apellidos;
    this.clientes.forEach((cliente)=>{
      cliente.visible = false;
    })

    this.clienteSeleccionado.emit(cliente);
  }

  cancelarCliente(){
    this.nombre = undefined;
  }
}
