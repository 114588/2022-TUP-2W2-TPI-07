import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipo-producto';
import {ProductoService} from "../../Services/producto.service"
import {TipoProductoService} from "../../Services/tipo-producto.service"
import {Router} from "@angular/router"
import { FromTo } from 'moment';
import { Subscription } from 'rxjs';
import { ThemeService } from 'ng2-charts';
import Swal from "sweetalert2"
import { Marca } from 'src/app/models/marca';
import {MarcaService} from "../../Services/marca.service"
import {descripcionValidador}  from "../alta-producto/validador-alta-producto-descripcion";
import {codigoBarraValidador} from "../alta-producto/validator-alta-producto-codigoBarra"

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
  listaMarca: Marca [] = [];
  
  public p: number = 1

  formularioModicacionProducto =this.fb.group({
    // codigo_barra : ["", {validators: [Validators.required, Validators.pattern(/^\d{4}$/)], asyncValidators:[codigoBarraValidador(this.apiProducto)], updateOn: 'blur'} ], //solo numeros y deben ser 4
    codigo_barra: [""],
    // descripcion: ["", {validators: [Validators.required], asyncValidators:[descripcionValidador(this.apiProducto)], updateOn: 'blur'} ],
    descripcion: ["", Validators.required],
    precio_unitario_venta: ["", Validators.required],
    precio_unitario_compra: ["", Validators.required],
    tipoProducto: [, Validators.required],
    marca: [, Validators.required]
  })

  constructor(private apiProducto: ProductoService, private apiTipoProducto: TipoProductoService, private router: Router, private apiMarca: MarcaService, private fb: FormBuilder) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerProductos()
    this.obtenerTipoProducto()
    this.obtenerMarca()  
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
      codigo_barra: this.productoSeleccionado.codigo_barra as any,
      descripcion: this.productoSeleccionado.descripcion,
      precio_unitario_venta: this.productoSeleccionado.precio_unitario_venta as any,
      precio_unitario_compra: this.productoSeleccionado.precio_unitario_compra as any,
      tipoProducto: this.productoSeleccionado.tipoProducto.id as any,
      marca: this.productoSeleccionado.marca.id as any
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
      tipoProducto:this.getTipoProductoById(this.formularioModicacionProducto.controls["tipoProducto"].value!) as any,
      marca: this.getMarcaById(this.formularioModicacionProducto.controls["marca"].value!) as any
    })
    // console.log(this.formularioModicacionProducto.value as Producto)

    this.apiProducto.modificarProducto(this.productoSeleccionado.id as any, this.formularioModicacionProducto.value as any).subscribe({
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
    this.apiProducto.eliminarProducto(item.id as any).subscribe({
      next: () => {
        Swal.fire("Se borró el Producto")

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["buscarProducto"]);
        }); 

      },
      error: (e)  =>{
        Swal.fire("Error al modificar " + e.message)
      }
    })

  }


  volver(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["buscarProducto"]);
    }); 
  }

  getTipoProductoById(id: number){
    return this.listaTipoProducto.find(x => x.id == id) ?? {} as TipoProducto;
  }

  getMarcaById(id: number){
    return this.listaMarca.find(x => x.id == id)
  }

  obtenerMarca(){
    this.apiMarca.obtenerTodos().subscribe({
      next: (item: Marca[]) => {
        this.listaMarca = item;
      },
      error: (e) => {
        Swal.fire("Error al obtener la marca " + e.message)
      }  
    })
  }


  get getCodigoBarra(){
    return this.formularioModicacionProducto.controls["codigo_barra"]
  }

  get getDescripcion(){
    return this.formularioModicacionProducto.controls["descripcion"]
  }
}