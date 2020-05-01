import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-cliente',
  templateUrl: './seleccionar-cliente.component.html',
  styleUrls: ['./seleccionar-cliente.component.scss']
})
export class SeleccionarClienteComponent implements OnInit {
  clientes: Cliente[]= new Array<Cliente>();

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
        this.clientes.push(cliente);
      })
    })

  }

}
