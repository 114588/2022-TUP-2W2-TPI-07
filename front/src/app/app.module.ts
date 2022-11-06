import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {RouterModule} from "@angular/router"
import {ReactiveFormsModule} from "@angular/forms"
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms"

//usuario
import { AltaComponentUsuario } from "../app/Usuario/alta/alta.component";

//home
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
import {BuscarEditarBorrarCliente} from './Cliente/buscar-editar-borrar/buscar-editar-borrar.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { VentasComponent } from './ventas/ventas.component';
import { AltaProductoComponent } from "../app/Productos/alta-producto/alta-producto.component";
import { BuscarEditarBorrarProductoComponent } from "../app/Productos/buscar-editar-borrar-producto/buscar-editar-borrar-producto.component";


//producto
import {ProductoService} from "../app/Services/producto.service"

//tipo producto
import {TipoProductoService} from "../app/Services/tipo-producto.service";
import { BuscarEditarBorrarUsuarioComponent } from '../app/Usuario/buscar-editar-borrar-usuario/buscar-editar-borrar-usuario.component'


//usuario
import {UsuarioService} from "../app/Services/usuario.service";
import { LoginComponent } from './Usuario/login/login.component'

//login
import {LoginService} from "../app/Services/login.service";
import { ReporteVentasComponent } from './Consultas/reporte-ventas/reporte-ventas.component'

//reporte
import {ReporteVentasService} from "../app/Services/reporte-ventas.service"

//ng2-charts
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AltaComponentCliente,
    AppComponent,
    AltaComponentUsuario,
    AltaComponentProveedor,
    ConsultarComponentProveedor,
    HomeComponent,
    MapaComponent,
    ConsultarComponent,
    BuscarEditarBorrarCliente,
    OrdenCompraComponent,
    VentasComponent,
    AltaProductoComponent,
    BuscarEditarBorrarProductoComponent,
    BuscarEditarBorrarUsuarioComponent,
    LoginComponent,
    ReporteVentasComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    GoogleMapsModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgChartsModule,
    
  ],
  providers: [ProveedorServiceService, OfertasService, ClienteService, ProductoService, TipoProductoService,UsuarioService,LoginService,ReporteVentasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
