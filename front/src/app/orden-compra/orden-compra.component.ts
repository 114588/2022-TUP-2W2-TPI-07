import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Proveedor } from '../models/proveedor';
import {ProveedorServiceService} from "../Services/proveedor-service.service"

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit, OnDestroy {

  suscripcion = new Subscription()

  valorBusqueda: string = ""
  listaProveedores: Proveedor[] = []

  constructor(private apiProveedor: ProveedorServiceService) { }
  
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
  }



  // ============== SECCION BUSQUEDA ===============

  buscarProveedor(){
    this.suscripcion.add(
      this.apiProveedor.buscarProveedorPorNombre(this.valorBusqueda).subscribe({
        next: (item: Proveedor) => {
          this.listaProveedores = [];
          this.listaProveedores.push(item)

          this.valorBusqueda = "";
        },
        error: (e) => {
          alert("error al obtener proveedores; " + e.message)
        }
      }))

      {{this.valorBusqueda}}

  }

  // ============== SECCION LISTADO =============
  elegir(item : Proveedor){
    alert(item.nombre)

  }





}
