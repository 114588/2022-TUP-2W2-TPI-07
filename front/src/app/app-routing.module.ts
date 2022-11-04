import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaComponentCliente } from './Cliente/alta/alta.component';
import {  BuscarEditarBorrarCliente } from './Cliente/buscar-editar-borrar/buscar-editar-borrar.component';
import { HomeComponent } from './home/home.component';
import { ConsultarComponent } from './Oferta/consultar/consultar.component';
import { OrdenCompraComponent } from './orden-compra/orden-compra.component';
import { AltaComponentProveedor } from './Proveedor/alta/alta.component';
import { ConsultarComponentProveedor } from './Proveedor/consultar-modificar-eliminar/consultar.component';
import { VentasComponent } from './ventas/ventas.component';

const routes: Routes = [
  {path: "home", component:HomeComponent},
  {path: "registrarProveedor", component:AltaComponentProveedor},
  {path: "buscarProveedor", component:ConsultarComponentProveedor},
  {path: "registrarCliente", component:AltaComponentCliente},
  {path: "buscarCliente", component:BuscarEditarBorrarCliente},
  {path: "ofertas", component:ConsultarComponent},
  {path: "ordenCompra", component:OrdenCompraComponent},
  {path: "venta", component:VentasComponent},
  {path:"", redirectTo:"home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
