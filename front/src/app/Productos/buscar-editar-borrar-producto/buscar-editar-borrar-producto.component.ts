import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipo-producto';
import {ProductoService} from "../../Services/producto.service"
import {TipoProductoService} from "../../Services/tipo-producto.service"
import {Router} from "@angular/router"

@Component({
  selector: 'app-buscar-editar-borrar-producto',
  templateUrl: './buscar-editar-borrar-producto.component.html',
  styleUrls: ['./buscar-editar-borrar-producto.component.css']
})
export class BuscarEditarBorrarProductoComponent implements OnInit {

  banderaFormularioEdicion: boolean = false;
  banderaListadoCompleto: boolean = true;
  banderaListadoBusqueda: boolean = false;
  
  listadoProductosOriginal:Producto[] = [];
  listaTipoProducto: TipoProducto[] = [];
  listadoBuscado: Producto[] = [];
  valorBuscado: string = ""

  productoSeleccionado: Producto = {} as Producto; 


  formularioModicacionProducto = new FormGroup({
    codigo: new FormControl("", Validators.required),
    descripcion: new FormControl(),
    precio_unitario_venta: new FormControl(),
    precio_unitario_compra: new FormControl(),
    tipoProducto: new FormControl()
  })



  constructor(private apiProducto: ProductoService, private apiTipoProducto: TipoProductoService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerProductos()
    this.obtenerTipoProducto()
  
  }

  
  // <!-- ============ SECCION BUSCAR ============== -->
  
  buscarProductoPorNombre(){
    this.apiProducto.buscarProductosPorNombre(this.valorBuscado).subscribe({
      next: (item: Producto[]) => {
        this.banderaListadoCompleto = false
        this.banderaListadoBusqueda = true;
        this.listadoBuscado = item;
        this.valorBuscado=""
      },
      error: (e) => {
        alert("error al obtener el tipo " + e.message)
      }
    })
  }



  // ============ SECCION LISTADO BUSQUEDA ==============

  editarProducto(item:Producto){
    this.banderaFormularioEdicion = true;
    this.productoSeleccionado = item;

    this.formularioModicacionProducto.setValue({
      codigo: this.productoSeleccionado.codigo,
      descripcion: this.productoSeleccionado.descripcion,
      precio_unitario_venta: this.productoSeleccionado.precio_unitario_venta,
      precio_unitario_compra: this.productoSeleccionado.precio_unitario_compra,
      tipoProducto: this.productoSeleccionado.tipoProducto.id
    })

  }



  // <!-- =============SECCION LISTADO COMPLETO ====================== -->
  obtenerProductos(){
    this.apiProducto.obtenerProducto().subscribe({
      next: (item: Producto[]) => {
        this.listadoProductosOriginal = item
      },
      error: (e) => {
        alert("error al obtener el tipo " + e.message)
      } 
    })
  }

  obtenerTipoProducto(){
    this.apiTipoProducto.obtenerTipoProducto().subscribe({
      next: (item: TipoProducto[]) => {
        this.listaTipoProducto = item;
      },
      error: (e) => {
        alert("error al obtener el tipo " + e.message)
      } 
    })
  }

  // obtenerAnidados() {
  //     this.apiTipoProducto.obtenerTipoProducto().subscribe({
  //       next: (itemTipoProducto: TipoProducto[]) => {
  //         this.apiProducto.obtenerProducto().subscribe({
  //           next: (itemProducto: Producto[]) => {
  //             for (const variable of itemProducto) {
  //               const categoriaIndex = itemTipoProducto.findIndex((x) => x.id === variable.id_tipo);
  //               variable.tipo = itemTipoProducto[categoriaIndex];
  //             }
  //             this.listadoProductosOriginal = itemProducto;
  //           },
  //           error: () => {
  //             alert('error al comunicarse con la API');
  //           },
  //         });
  //       },
  //     })


  // <!-- ================ FORMULARIO MODIFICAR ================ -->
  guardar(){

    this.formularioModicacionProducto.patchValue({
      tipoProducto:this.getTipoProductoById(this.formularioModicacionProducto.controls["tipoProducto"].value)
    })


    console.log(this.formularioModicacionProducto.value as Producto)

    this.apiProducto.modificarProducto(this.productoSeleccionado.id, this.formularioModicacionProducto.value as Producto).subscribe({
      next: () => {
        alert("producto modificado")
      },
      error: (e)  =>{
        alert("error al modificar " + e.message)
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




