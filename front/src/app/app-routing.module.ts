import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaComponentCliente } from './Cliente/alta/alta.component';
import {  BuscarEditarBorrarCliente } from './Cliente/buscar-editar-borrar/buscar-editar-borrar.component';
import { HomeComponent } from './home/home.component';
import { ConsultarComponent } from './Oferta/consultar/consultar.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { AltaProductoComponent } from '../app/Productos/alta-producto/alta-producto.component';
import { AltaComponentProveedor } from './Proveedor/alta/alta.component';
import { ConsultarComponentProveedor } from './Proveedor/consultar-modificar-eliminar/consultar.component';
import { VentasComponent } from './ventas/ventas.component';
import { BuscarEditarBorrarProductoComponent } from './Productos/buscar-editar-borrar-producto/buscar-editar-borrar-producto.component';
import { AltaComponentUsuario } from './Usuario/alta/alta.component';
import { BuscarEditarBorrarUsuarioComponent } from './Usuario/buscar-editar-borrar-usuario/buscar-editar-borrar-usuario.component';
import { LoginComponent } from './Usuario/login/login.component';
import { AutenticarGuard } from './guards/autenticar.guard';
import { AutorizarGuard } from './guards/autorizar.guard';
import { ReporteVentasComponent } from './Consultas/reporte-ventas/reporte-ventas.component';
import { BuscarOrdenCompraComponent } from './orden-compra/buscar-orden-compra/buscar-orden-compra.component';



const routes: Routes = [
  {path: "home", component:HomeComponent},
  {path: "registrarProducto", component:AltaProductoComponent, canActivate: [AutenticarGuard, AutorizarGuard]},
  {path: "buscarProducto", component:BuscarEditarBorrarProductoComponent, canActivate: [AutenticarGuard]},
  {path: "registrarProveedor", component:AltaComponentProveedor, canActivate: [AutenticarGuard, AutorizarGuard]},
  {path: "registrarOrdenCompra", component:OrdenCompraComponent, canActivate: [AutenticarGuard, AutorizarGuard]},
  {path: "buscarOrdenCompra", component: BuscarOrdenCompraComponent, canActivate: [AutenticarGuard]},
  {path: "buscarProveedor", component:ConsultarComponentProveedor, canActivate: [AutenticarGuard]},
  {path: "registrarCliente", component:AltaComponentCliente, canActivate: [AutenticarGuard, AutorizarGuard]},
  {path: "buscarCliente", component:BuscarEditarBorrarCliente, canActivate: [AutenticarGuard]},
  {path: "registrarUsuario", component:AltaComponentUsuario, canActivate: [AutenticarGuard, AutorizarGuard]},
  {path: "buscarUsuario", component:BuscarEditarBorrarUsuarioComponent, canActivate: [AutenticarGuard]},
  {path: "venta", component:VentasComponent, canActivate: [AutenticarGuard]},
  {path: "login", component:LoginComponent},
  {path:"reporte", component: ReporteVentasComponent, canActivate: [AutenticarGuard, AutorizarGuard]},
  {path: "", redirectTo:"login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
