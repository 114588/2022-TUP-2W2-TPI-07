import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OrdenCompra } from 'src/app/models/OrdenCompra/orden-compra';
import { Proveedor } from 'src/app/models/proveedor';
import  {ProveedorServiceService} from "../../Services/proveedor-service.service"
import {OrdenCompraService} from "../../Services/orden-compra.service"
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-buscar-orden-compra',
  templateUrl: './buscar-orden-compra.component.html',
  styleUrls: ['./buscar-orden-compra.component.css']
})
export class BuscarOrdenCompraComponent implements OnInit, OnDestroy {

  listaOrdenesCompra: OrdenCompra[] = []
  listaOrdenesCompraBuscada: OrdenCompra[] = []
  listaProveedores: Proveedor[] = []
  suscripcion =new Subscription()
  public p: number = 1
  valorBusqueda= new FormControl("");

  constructor(private apiProveedor: ProveedorServiceService, private apiOrdenCompra: OrdenCompraService) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerListaProveedores();
    this.obtenerListaOrdenesCompra();
  }


  obtenerListaOrdenesCompra(){
    this.suscripcion.add(
      this.apiOrdenCompra.obtenerOrdenCompra().subscribe({
        next: (item: OrdenCompra[]) => {
          this.listaOrdenesCompra = item;
        },
        error: (e) => {
          Swal.fire('Error al obtener listado ' + e.message);
        }
      })
    )
  }

  obtenerListaProveedores() {
    this.suscripcion.add(
      this.apiProveedor.obtenerTodos().subscribe({
        next: (proveedores: Proveedor[]) => {
          this.listaProveedores = proveedores  ;
        },
        error: (e) => {
          Swal.fire('Error al obtener listado ' + e.message);
        },
      })
    );
  }


  buscarOrdenCompra(){
    this.suscripcion.add(
      this.apiOrdenCompra.buscarOrdenCompraPorNombre(this.valorBusqueda.value!).subscribe({
        next: (item: OrdenCompra[]) => {
          console.log(item)
          this.listaOrdenesCompraBuscada = item;

        },
        error: (e) => {
          Swal.fire('Error al obtener listado ' + e.message);
        },
      })
    )
  }
}