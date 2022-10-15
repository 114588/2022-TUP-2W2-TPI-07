import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router"
import {ReactiveFormsModule} from "@angular/forms"

//usuario
import { AltaComponent } from "../app/Usuario/alta/alta.component";
import { BajaComponent } from '../app/Usuario/baja/baja.component';
import { ModificarComponent } from '../app/Usuario/modificar/modificar.component';
import { IngresarComponent } from '../app/Usuario/ingresar/ingresar.component';
//proveedor
import {AltaComponentProveedor} from "../app/Proveedor/alta/alta.component";
import {BajaComponentProveedor} from "../app/Proveedor/baja/baja.component";
import {ConsultarComponentProveedor} from "../app/Proveedor/consultar/consultar.component"
import {ModificarComponentProveedor} from "../app/Proveedor/modificar/modificar.component"

@NgModule({
  declarations: [
    AppComponent,
    AltaComponent,
    BajaComponent,
    ModificarComponent,
    IngresarComponent,
    AltaComponentProveedor,
    BajaComponentProveedor,
    ConsultarComponentProveedor,
    ModificarComponentProveedor



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
