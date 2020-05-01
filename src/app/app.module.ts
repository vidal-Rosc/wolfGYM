import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { HeaderComponent } from './header/header.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AddClientesComponent } from './add-clientes/add-clientes.component';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { MensajesService } from './services/mensajes.service';
import { PreciosComponent } from './precios/precios.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ClientesComponent,
    AddClientesComponent,
    PreciosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),

  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MensajesService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
