import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { ClientesComponent } from '../clientes/clientes.component';

import Swal from 'sweetalert2';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.scss']
})
export class AddClientesComponent implements OnInit {
  clientesFormulario: FormGroup;
  porcentajeSubida: number = 0;
  imagenURl: string = '';
  esNuevo: boolean = true;
  id: string;

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private bbdd: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private sms: MensajesService,
  ) { }

  ngOnInit() {
    //Creamos el formulario
    this.clientesFormulario = this.fb.group({
      apellidos: ['', Validators.required],
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      nombre: ['', Validators.required],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', Validators.required],
      foto: ['', Validators.required],
    })


    //Obtenemos el ID del cliente
    this.id = this.activeRoute.snapshot.params.clienteID;
    console.log(this.id);

    //Esto editara el usuario si se pasa su parametro ID por Url.
    if (this.id != undefined) {

      this.esNuevo= false;
      //hacemos un set de los valores al formulario
      this.bbdd.doc<any>(`clientes` + '/' + this.id).valueChanges().subscribe((cliente) => {
        console.log(cliente)


        this.clientesFormulario.setValue({
          nombre: cliente.nombre,
          apellidos: cliente.apellidos,
          email: cliente.email,
          fecha_nacimiento: new Date(cliente.fecha_nacimiento.seconds * 1000).toISOString().substring(0, 10),
          telefono: cliente.telefono,
          foto: '',
        })
        this.imagenURl = cliente.foto;
      })
    }
  }

  agregar() {

    //cambiamos el nombre de la imagen para que se pueda cargar en la bbdd
    this.clientesFormulario.value.foto = this.imagenURl;
    //Tambien se debe cambiar el formato de fecha_nacimiento, para ello:
    this.clientesFormulario.value.fecha_nacimiento = new Date(this.clientesFormulario.value.fecha_nacimiento);
    console.log(this.clientesFormulario.value)
    this.bbdd.collection('clientes').add(this.clientesFormulario.value).then((res) => {
      console.log('Registro creado');
      this.sms.mensajeCorrecto('Agregado','Usuario agregado correctamente');
    })
  }

  editar(){
     //cambiamos el nombre de la imagen para que se pueda cargar en la bbdd
     this.clientesFormulario.value.foto = this.imagenURl;
        //Tambien se debe cambiar el formato de fecha_nacimiento, para ello:
    this.clientesFormulario.value.fecha_nacimiento = new Date(this.clientesFormulario.value.fecha_nacimiento);
    this.bbdd.doc('clientes/' + this.id).update(this.clientesFormulario.value).then((resp)=>{
      console.log('Usuario editado correctamente')
      this.sms.mensajeCorrecto('Editado','Usuario editado correctamente')

    }).catch((error)=>{
      console.log(error)
      this.sms.mensajeError('error','Ha ocurrido un error al editar al usuario')
    })
  }


  subirImagen(evento) {

    if (evento.target.files.length > 0) {
      //llevando la fecha a string para darle nombre a la imagen
      let nombreFoto = new Date().getTime().toString();
      let archivo = evento.target.files[0];

      //obteniendo el formato de la imagen.
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf(`.`));

      let ruta = 'clientes/' + nombreFoto + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((objeto) => {
        console.log('imagen subida')
        //obtenemos la URl de la imagen e igualamos nuestra var imagenURl a esta.
        referencia.getDownloadURL().subscribe((url) => {
          console.log(url)
          this.imagenURl = url;
        })
      })
      tarea.percentageChanges().subscribe((porcentaje) => {
        this.porcentajeSubida = parseInt(porcentaje.toString());
      })
    }
  }

}
