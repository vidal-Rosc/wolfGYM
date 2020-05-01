import { DocumentReference } from '@angular/fire/firestore';

export class Cliente {
  id:string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: number;
  foto: string;
  fecha_nacimiento: Date;
  ref: DocumentReference;
  //para que al ser buscado el cliente (searching) se muestre o no.
  visible: boolean;

  constructor(){}
}
