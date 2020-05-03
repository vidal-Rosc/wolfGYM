import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { AddClientesComponent } from './add-clientes/add-clientes.component';
import { PreciosComponent } from './precios/precios.component';
import { RegistrosComponent } from './registros/registros.component';
import { pathToFileURL } from 'url';
import { ListaRegistrosComponent } from './lista-registros/lista-registros.component';


const routes: Routes = [
  {
    path:'', redirectTo: 'registro', pathMatch:'full'
  },
  {
    path:'registro', component: RegistrosComponent
  },
  {
    path:'registros', component: ListaRegistrosComponent
  },

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
