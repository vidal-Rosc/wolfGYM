import { DocumentData } from '@angular/fire/firestore';

export class Precio {
  id: string;
  nombre: string;
  costo: number;
  duracion: number;
  plan: number;
  ref: DocumentData;
}
