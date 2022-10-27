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
import { HomeComponent } from './home/home.component';

//proveedor
import {AltaComponentProveedor} from "../app/Proveedor/alta/alta.component";
import {ConsultarComponentProveedor} from "./Proveedor/consultar-modificar-eliminar/consultar.component"


//Ofertas
import { ConsultarComponent } from './Oferta/consultar/consultar.component'


//services
import {ProveedorServiceService} from "../app/Services/proveedor-service.service"
import { OfertasService} from "../app/Services/ofertas.service"
import { ClienteService} from "../app/Services/cliente.service"


//google maps
import {GoogleMapsModule} from "@angular/google-maps";
import { MapaComponent } from '../app/Proveedor/mapa/mapa.component';

// search
import {Ng2SearchPipeModule} from "ng2-search-filter";

//Cliente
import {AltaComponentCliente} from "./Cliente/alta/alta.component";
import {BUscarEditarBorrar} from './Cliente/buscar-editar-borrar/buscar-editar-borrar.component';



@NgModule({
  declarations: [
    AltaComponentCliente,
    AppComponent,
    AltaComponent,
    BajaComponent,
    ModificarComponent,
    IngresarComponent,
    AltaComponentProveedor,
    ConsultarComponentProveedor,
    HomeComponent,
    MapaComponent,
    ConsultarComponent,
    BUscarEditarBorrar,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    Ng2SearchPipeModule,
    
  ],
  providers: [ProveedorServiceService, OfertasService, ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
