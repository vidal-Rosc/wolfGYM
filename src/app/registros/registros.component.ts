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
  precioSeleccionado: Precio = new Precio();

  constructor(private bbdd: AngularFirestore) { }

  ngOnInit() {
    this.bbdd.collection('precios').get().subscribe((resultado) => {
      resultado.docs.forEach((item) => {
        let precio = item.data() as Precio;
        precio.id = item.id;
        precio.ref = item.ref;
        this.precios.push(precio);
      })
    })
  }

  asignarCliente(cliente: Cliente) {
    this.registro.cliente = cliente.ref;
    this.ClienteSelected = cliente;
  }

  cancelarCliente() {
    //de esta forma eliminamos los clientes de nuestro registro
    this.ClienteSelected = new Cliente();
    this.registro.cliente = undefined;
  }

  guardar() {
    console.log(this.registro);
    if(this.registro.validar().esValido){
      console.log('Guardando....')
    } else {
      console.log(this.registro.validar().mensaje)
    }
  }

  seleccionarPrecio(id: string) {

    if (id != null) {
      console.log(id)
      this.precioSeleccionado = this.precios.find(x => x.id == id);
      //this.registro.precios = this.precioSeleccionado.ref
      this.registro.fecha = new Date();


      //Calculando los precios:
      this.registro.subTotal = this.precioSeleccionado.costo;
      this.registro.iva = this.registro.subTotal * 0.21;
      this.registro.total = this.registro.subTotal + this.registro.iva;

      //Calcuando los dias
      if (this.precioSeleccionado.plan == 1) {
        let dias = this.precioSeleccionado.duracion;
        let fechaFinal = new Date(this.registro.fecha.getFullYear(), this.registro.fecha.getMonth(), this.registro.fecha.getDate() + dias)
        this.registro.fechaFinal = fechaFinal;
        //fechaFinal = this.precioSeleccionado.duracion * 1;
      }
      if (this.precioSeleccionado.plan == 2) {
        let dias = this.precioSeleccionado.duracion * 7;
        let fechaFinal = new Date(this.registro.fecha.getFullYear(), this.registro.fecha.getMonth(), this.registro.fecha.getDate() + dias)
        this.registro.fechaFinal = fechaFinal;

      }
      if (this.precioSeleccionado.plan == 3) {
        let dias = this.precioSeleccionado.duracion * 30;
        let fechaFinal = new Date(this.registro.fecha.getFullYear(), this.registro.fecha.getMonth(), this.registro.fecha.getDate() + dias)
        this.registro.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.plan == 4) {
        let meses = this.precioSeleccionado.duracion * 3;
        let fechaFinal = new Date(this.registro.fecha.getFullYear(), this.registro.fecha.getMonth() + meses, this.registro.fecha.getDate())
        this.registro.fechaFinal = fechaFinal;
      }
      if (this.precioSeleccionado.plan == 5) {
        let anio = this.registro.fecha.getFullYear();
        let meses = this.precioSeleccionado.duracion * 12 + this.registro.fecha.getMonth();
        let dia: number = this.registro.fecha.getDate();
        let fechaFinal = new Date(anio, meses, dia)
        this.registro.fechaFinal = fechaFinal;
      }
    } else {
      this.precioSeleccionado = new Precio();
      this.registro.fecha = null;
      this.registro.fechaFinal = null;
      this.registro.precios = null;
      this.registro.subTotal = 0;
      this.registro.iva = 0;
      this.registro.total = 0;
    }
  }

}
