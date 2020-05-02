import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Registro } from '../models/registro';
import { Cliente } from '../models/cliente';
import { ClientesComponent } from '../clientes/clientes.component';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.scss']
})
export class RegistrosComponent implements OnInit {
  registro: Registro = new Registro();
  ClienteSelected: Cliente = new Cliente();
  precios: Precio[] = new Array<Precio>();
  precioSeleccionado: Precio =  new Precio();

  constructor(private bbdd: AngularFirestore) { }

  ngOnInit(){
    this.bbdd.collection('precios').get().subscribe((resultado)=>{
      resultado.docs.forEach((item)=>{
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
      })
    })
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
    console.log(this.registro);
  }

  seleccionarPrecio(id:string){
    console.log(id)
    this.precioSeleccionado = this.precios.find( x => x.id == id);
    this.registro.precios = this.precioSeleccionado.ref;
    console.log(this.precioSeleccionado)
  }
}
