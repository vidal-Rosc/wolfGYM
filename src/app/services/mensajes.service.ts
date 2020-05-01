import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeError(titulo: string, mensaje:string){
    Swal.fire(
      titulo,
      mensaje,
      'error'
    )
  }


  mensajeAdvertencia(titulo: string, mensaje:string){
    Swal.fire(
      titulo,
      mensaje,
      'warning'
    )
  }

  mensajeCorrecto(titulo: string, mensaje:string){
    Swal.fire(
      titulo,
      mensaje,
      'success'
    )
  }
}
