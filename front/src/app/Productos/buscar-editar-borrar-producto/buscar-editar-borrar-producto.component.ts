import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipo-producto';
import {ProductoService} from "../../Services/producto.service"
import {TipoProductoService} from "../../Services/tipo-producto.service"

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
  listadoTipoProducto: TipoProducto[] = [];
  valorBuscado: string = ""

  constructor(private apiProducto: ProductoService, private apiTipoProducto: TipoProductoService) { }

  ngOnInit(): void {
    this.obtenerProductos()
    // this.obtenerAnidados()
  
  }

  // <!-- ============ SECCION BUSCAR ============== -->
  buscarProductoPorNombre(){

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
        this.listadoTipoProducto = item;
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

  }




