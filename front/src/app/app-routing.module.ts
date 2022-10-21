import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultarComponent } from './Oferta/consultar/consultar.component';
import { AltaComponentProveedor } from './Proveedor/alta/alta.component';
import { ConsultarComponentProveedor } from './Proveedor/consultar-modificar-eliminar/consultar.component';

const routes: Routes = [
  {path: "home", component:HomeComponent},
  {path: "registrarProveedor", component:AltaComponentProveedor},
  {path: "buscarProveedor", component:ConsultarComponentProveedor},
  {path: "ofertas", component:ConsultarComponent},
  {path:"", redirectTo:"home", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
