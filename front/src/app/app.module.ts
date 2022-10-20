import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router"
import {ReactiveFormsModule} from "@angular/forms"
import {HttpClientModule} from "@angular/common/http"

//usuario
import { AltaComponent } from "../app/Usuario/alta/alta.component";
import { BajaComponent } from '../app/Usuario/baja/baja.component';
import { ModificarComponent } from '../app/Usuario/modificar/modificar.component';
import { IngresarComponent } from '../app/Usuario/ingresar/ingresar.component';
//proveedor
import {AltaComponentProveedor} from "../app/Proveedor/alta/alta.component";
import {ConsultarComponentProveedor} from "./Proveedor/consultar-modificar-eliminar/consultar.component"


//services
import {ProveedorServiceService} from "../app/Services/proveedor-service.service"

//google maps
import {GoogleMapsModule} from "@angular/google-maps";
import { HomeComponent } from './home/home.component';


// search
import {Ng2SearchPipeModule} from "ng2-search-filter"

@NgModule({
  declarations: [
    AppComponent,
    AltaComponent,
    BajaComponent,
    ModificarComponent,
    IngresarComponent,
    AltaComponentProveedor,
    ConsultarComponentProveedor,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    Ng2SearchPipeModule
  ],
  providers: [ProveedorServiceService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
