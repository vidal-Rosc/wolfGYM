import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';

import { MensajesService } from '../services/mensajes.service';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecio: FormGroup;
  //para mostrar la lista de precios
  listaPrecios: Precio[] = new Array<Precio>();
  //para mostrar o no los botones
  aEditar: boolean = false;
  id: string;
  constructor(private fb: FormBuilder, private bbdd: AngularFirestore, private sms: MensajesService) { }

  ngOnInit() {
    this.formularioPrecio = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      plan: ['', Validators.required],
    })

    this.mostrarPrecios();
  }


  //No lo hacemos directamente en el ngOnInit porque
  //Se necesitara tambien a la hora de editar.
  mostrarPrecios() {
    this.bbdd.collection<Precio>('precios').get().subscribe((resultado) => {
      this.listaPrecios.length = 0; //Con esto logramos que elimine los items que tenia, y haga un push de los nuevos
      console.log(resultado.docs)
      for (let data of resultado.docs) {

        // con esto, me creo un cliente y lo igualo a la data.
        //le creo los campos id y ref y por ultimo lo agrego al listado de clientes.
        let precio = data.data() as Precio;
        precio.id = data.id;
        precio.ref = data.ref;
        this.listaPrecios.push(precio);
      }
    });
  }


  agregar() {
    this.bbdd.collection('precios').add(this.formularioPrecio.value).then((resp) => {
      console.log(resp);
      this.sms.mensajeCorrecto('Agregado', 'Se ha agregado correctamente');
      this.formularioPrecio.reset();
      this.mostrarPrecios();
    }).catch((error) => {
      console.log(error);
      this.sms.mensajeError('Error', 'Algo ha ocurrido al guardar los datos!');
    })
  }

  editar() {
    this.bbdd.doc('precios/' + this.id).update(this.formularioPrecio.value).then(() => {
      console.log('Plan editado correctamente')
      this.sms.mensajeCorrecto('Editado', 'Plan editado correctamente')
      this.formularioPrecio.reset();
      //Esto para que alterne nuevamente el boton a agregar una vez editemos.
      this.aEditar = false;
      this.mostrarPrecios();
    }).catch(() => {
      this.sms.mensajeError('error', 'Ha ocurrido un error al editar el plan deseado!')
    })

  }

  editarPlan(precio: Precio) {
    this.aEditar = true;
    this.formularioPrecio.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      plan: precio.plan,
    })
    this.id = precio.id;
  }

}
