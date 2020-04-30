import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { AddClientesComponent } from './add-clientes/add-clientes.component';


const routes: Routes = [
  {
    path:'clientes', component: ClientesComponent
  },
  {
    path:'add-clientes', component: AddClientesComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
