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

    //Obteniendo el ID desde firebase
    //nos aseguramos de que el array esta vacio
    this.clientes.length = 0;
    this.bbdd.collection('clientes').get().subscribe((resultado)=>{
      console.log(resultado.docs)
      for(let item of resultado.docs){
        // console.log(item.id);
        // console.log(item.data());
        // console.log(item.ref);
         // con esto, me creo un cliente y lo igualo a la data.
         //le creo los campos id y ref y por ultimo lo agrego al listado de clientes.
        let cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        this.clientes.push(cliente);
      }

    })

  }

  buscarCliente(){

  }

  //Vamos a pasar el IDcliente por parametro, para poder asi editarlo
}
