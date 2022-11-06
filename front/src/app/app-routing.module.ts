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



const routes: Routes = [
  {path: "home", component:HomeComponent},
  {path: "registrarProducto", component:AltaProductoComponent, canActivate: [AutenticarGuard]},
  {path: "buscarProducto", component:BuscarEditarBorrarProductoComponent},
  {path: "registrarProveedor", component:AltaComponentProveedor, canActivate: [AutenticarGuard]},
  {path: "buscarProveedor", component:ConsultarComponentProveedor},
  {path: "registrarCliente", component:AltaComponentCliente, canActivate: [AutenticarGuard]},
  {path: "buscarCliente", component:BuscarEditarBorrarCliente},
  {path: "registrarUsuario", component:AltaComponentUsuario, canActivate: [AutenticarGuard]},
  {path: "buscarUsuario", component:BuscarEditarBorrarUsuarioComponent},
  {path: "venta", component:VentasComponent},
  {path: "login", component:LoginComponent},
  {path: "", redirectTo:"login", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
