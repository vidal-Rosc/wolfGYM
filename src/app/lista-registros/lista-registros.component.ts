import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-lista-registros',
  templateUrl: './lista-registros.component.html',
  styleUrls: ['./lista-registros.component.scss']
})
export class ListaRegistrosComponent implements OnInit {
  registros: any[] = [];
  constructor(private bbdd: AngularFirestore) { }

  ngOnInit() {
    this.registros.length = 0 // ahorramos duplicados.
    this.bbdd.collection('registro').get().subscribe((response)=>{
      response.forEach((registro)=>{
        let registroObtenido = registro.data();
        registroObtenido.id = registro.id;
        // obtenemos la informacion del cliente por medio de la referencia.
        this.bbdd.doc(registro.data().cliente.path).get().subscribe((cliente)=>{
          console.log(cliente.data())
          registroObtenido.clienteObtenido = cliente.data();
          //obtenemos la info de las fechas
          registroObtenido.fecha = new Date(registroObtenido.fecha.seconds * 1000);
          registroObtenido.fechaFinal = new Date(registroObtenido.fechaFinal.seconds * 1000);
          this.registros.push(registroObtenido);
          console.log(registroObtenido);
        })
      })
    })
  }

}
