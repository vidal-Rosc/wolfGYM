import { DocumentReference } from '@angular/fire/firestore';

export class Cliente {
  id:string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: number;
  foto: string;
  fecha_nacimiento: Date;
  ref: DocumentReference

  constructor(){
    // this.id = this.id;
    // this.nombre = this.nombre;
    // this.apellidos = this.apellidos;
    // this.email = this.email;
    // this.telefono = this.telefono;
    // this.foto = this.foto;
    // this.fecha_nacimiento = this.fecha_nacimiento;
  }
}
