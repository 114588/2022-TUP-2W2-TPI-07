import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../models/proveedor';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit {

  valorBusqueda: string = ""
  listaProveedor: Proveedor[] = []

  constructor() { }

  ngOnInit(): void {
  }

  // ============== SECCION BUSQUEDA ===============


// ============== SECCION LISTADO =============
editar(item : Proveedor){

}


borrar(item: Proveedor){
  
}




}
