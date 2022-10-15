import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaComponentProveedor } from './Proveedor/alta/alta.component';
import { ConsultarComponentProveedor } from './Proveedor/consultar/consultar.component';

const routes: Routes = [
  {path: "registrarProveedor", component:AltaComponentProveedor},
  {path: "buscarProveedor", component:ConsultarComponentProveedor}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
