import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-add-clientes',
  templateUrl: './add-clientes.component.html',
  styleUrls: ['./add-clientes.component.scss']
})
export class AddClientesComponent implements OnInit {
  clientesFormulario: FormGroup;
  porcentajeSubida: number = 0;
  constructor(private fb:FormBuilder, private storage: AngularFireStorage) { }

  ngOnInit(){
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
  }

  agregar(){
    console.log(this.clientesFormulario.value)
  }

  subirImagen(evento){
    //llevando la fecha a string para darle nombre a la imagen
    let nombreFoto = new Date().getTime().toString();
    let archivo = evento.target.files[0];

    //obteniendo el formato de la imagen.
    let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf(`.`));

    let ruta = 'clientes/'+ nombreFoto + extension;
    const referencia = this.storage.ref(ruta);
    const tarea = referencia.put(archivo);
    tarea.then((objeto)=>{
      console.log('imagen subida')
    })
    tarea.percentageChanges().subscribe((porcentaje)=>{
      this.porcentajeSubida = parseInt(porcentaje.toString());
    })
  }

}
