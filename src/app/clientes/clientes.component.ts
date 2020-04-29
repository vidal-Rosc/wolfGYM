import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  clientes: Array<any> = new Array<any>();
  constructor(private bbdd: AngularFirestore) { }

  ngOnInit(){
    this.bbdd.collection('clientes').valueChanges().subscribe((resultado)=>{
      console.log(resultado)
      this.clientes = resultado;
    })
  }

  buscarCliente(){

  }
}
