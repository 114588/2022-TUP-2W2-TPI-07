import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipo-producto';
import {ProductoService} from "../../Services/producto.service"
import {TipoProductoService} from "../../Services/tipo-producto.service"
import {Router} from "@angular/router"
import { FromTo } from 'moment';
import { Subscription } from 'rxjs';
import { ThemeService } from 'ng2-charts';
import Swal from "sweetalert2"

@Component({
  selector: 'app-buscar-editar-borrar-producto',
  templateUrl: './buscar-editar-borrar-producto.component.html',
  styleUrls: ['./buscar-editar-borrar-producto.component.css']
})
export class BuscarEditarBorrarProductoComponent implements OnInit, OnDestroy {

  banderaFormularioEdicion: boolean = false;
  banderaListadoCompleto: boolean = true;
  banderaListadoBusqueda: boolean = false;
  
  listadoProductosOriginal:Producto[] = [];
  listaTipoProducto: TipoProducto[] = [];
  listadoBuscado: Producto[] = [];
  valorBuscado : string = ""
  productoSeleccionado: Producto = {} as Producto; 
  suscripcion = new Subscription();
  
  public p: number = 1

  formularioModicacionProducto = new FormGroup({
    codigo_barra: new FormControl("", Validators.required),
    descripcion: new FormControl(),
    precio_unitario_venta: new FormControl(),
    precio_unitario_compra: new FormControl(),
    tipoProducto: new FormControl()
  })

  constructor(private apiProducto: ProductoService, private apiTipoProducto: TipoProductoService, private router: Router) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerProductos()
    this.obtenerTipoProducto()  
  }
  
  // <!-- ============ SECCION BUSCAR ============== -->  
  buscarProductoPorNombre(){
    if(this.valorBuscado == ""){     
     this.obtenerProductos();
     this.banderaListadoBusqueda=false;
     this.banderaListadoCompleto=true;

    } else {
      this.suscripcion.add(
      this.apiProducto.buscarProductosPorNombre(this.valorBuscado).subscribe({
        next: (item: Producto[]) => {
          
          this.listadoBuscado = [] //limpio la lista asi no acumula
          this.listadoBuscado = item; //asigno  lo que viene de la api
          this.banderaListadoCompleto = false //oculto el listado completo
          this.banderaListadoBusqueda = true; //muestro el listado de la busqueda
          //this.valorBuscado.setValue("")
        },
        error: (e) => {
          Swal.fire("error al obtener el tipo " + e.message)
        }
      })
      )
    }
  }
  // ============ SECCION LISTADO BUSQUEDA ==============

  editarProducto(item:Producto){
    this.banderaFormularioEdicion = true;
    this.productoSeleccionado = item;

    this.formularioModicacionProducto.setValue({
      codigo_barra: this.productoSeleccionado.codigo_barra,
      descripcion: this.productoSeleccionado.descripcion,
      precio_unitario_venta: this.productoSeleccionado.precio_unitario_venta,
      precio_unitario_compra: this.productoSeleccionado.precio_unitario_compra,
      tipoProducto: this.productoSeleccionado.tipoProducto.id
    })
  }

  // <!-- =============SECCION LISTADO COMPLETO ====================== -->
  obtenerProductos(){
    this.suscripcion.add(
    this.apiProducto.obtenerProducto().subscribe({
      next: (item: Producto[]) => {
        this.listadoProductosOriginal = item
        console.log(this.listaTipoProducto)
      },
      error: (e) => {
        Swal.fire("Error al obtener el tipo " + e.message)
      } 
    })
    )
  }

  obtenerTipoProducto(){
    this.suscripcion.add(
    this.apiTipoProducto.obtenerTipoProducto().subscribe({
      next: (item: TipoProducto[]) => {
        this.listaTipoProducto = item;
      },
      error: (e) => {
        Swal.fire("Error al obtener el tipo " + e.message)
      } 
    })
    )
  }

  // <!-- ================ FORMULARIO MODIFICAR ================ -->
  modificarDesdeFormulario(){
    this.formularioModicacionProducto.patchValue({
      tipoProducto:this.getTipoProductoById(this.formularioModicacionProducto.controls["tipoProducto"].value)
    })
    // console.log(this.formularioModicacionProducto.value as Producto)

    this.apiProducto.modificarProducto(this.productoSeleccionado.id, this.formularioModicacionProducto.value as Producto).subscribe({
      next: () => {
        Swal.fire("Producto modificado")
        this.banderaFormularioEdicion=false;  //oculto formulario edicion
        this.buscarProductoPorNombre() //vuelvo a llamar a la api y traigo todo
      },
      error: (e)  =>{
        Swal.fire("Error al modificar " + e.message)
      }
    })
  }

  eliminarProducto(item: Producto){
    this.apiProducto.eliminarProducto(item.id).subscribe({
      next: () => {
        Swal.fire("Se borro el Producto")
      },
      error: (e)  =>{
        Swal.fire("Error al modificar " + e.message)
      }
    })

  }


  volver(){
    this.router.navigateByUrl('home');
  }

  getTipoProductoById(id: number){
    return this.listaTipoProducto.find(x => x.id == id) ?? {} as TipoProducto;
  }
}