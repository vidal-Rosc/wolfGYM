import { DocumentReference } from '@angular/fire/firestore';

export class Registro {
  fecha: Date;
  fechaFinal: Date;
  cliente: DocumentReference;
  precios: DocumentReference;
  subtotal: number;
  iva: number;
  total: number;

  constructor(){
    this.fecha = null;
    this.fechaFinal = this.fechaFinal;
    this.cliente = this.cliente;
    this.precios = this.precios;
    this.subtotal = this.subtotal;
    this.iva = this.iva;
    this.total = this.total;
  }
}
