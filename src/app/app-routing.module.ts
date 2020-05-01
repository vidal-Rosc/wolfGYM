import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { AddClientesComponent } from './add-clientes/add-clientes.component';
import { PreciosComponent } from './precios/precios.component';


const routes: Routes = [
  {
    path:'clientes', component: ClientesComponent
  },
  {
    path:'add-clientes', component: AddClientesComponent
  },
  {
    path:'add-clientes/:clienteID', component: AddClientesComponent
  },
  {
    path:'precios', component: PreciosComponent
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
