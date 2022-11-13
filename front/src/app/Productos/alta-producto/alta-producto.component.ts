import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipo-producto';
import {ProductoService} from "../../Services/producto.service"
import {TipoProductoService} from "../../Services/tipo-producto.service"
import Swal from "sweetalert2"
import { Marca } from 'src/app/models/marca';
import {MarcaService} from "../../Services/marca.service"
import { codigoBarraValidador } from './validator-alta-producto-codigoBarra';
import {descripcionValidador} from "../../Productos/alta-producto/validador-alta-producto-descripcion"

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
  nuevoProducto : Producto ;
  listaTipoProducto: TipoProducto[] = [];
  listaMarca: Marca [] = [];
  tipoProductoSeleccionado: TipoProducto = {} as TipoProducto;

  formularioAltaProducto =this.fb.group({
    codigo_barra : ["", {validators: [Validators.required, Validators.pattern(/^\d{4}$/)], asyncValidators:[codigoBarraValidador(this.apiProducto)], updateOn: 'blur'} ], //solo numeros y deben ser 4
    descripcion: ["", {validators: [Validators.required], asyncValidators:[descripcionValidador(this.apiProducto)], updateOn: 'blur'} ],
    tipoProducto : [[Validators.required]],
    precio_unitario_venta : ["", [Validators.required]],
    precio_unitario_compra:["", [Validators.required]],
    marca: [[Validators.required]]

  })
  constructor(private apiProducto: ProductoService, private router: Router, private apiTipoProducto: TipoProductoService, private apiMarca: MarcaService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.obtenerTipoProducto();
    this.obtenerMarca();
  }

  guardar(){

    //aca lo que hago es: con el id, buscar el objeto completo y ese objeto ponerlo en la propiedad
    this.formularioAltaProducto.patchValue({
      tipoProducto: this.getTipoProductoById(parseInt(this.formularioAltaProducto.controls["tipoProducto"].value!)) as any,
      marca: this.getMarcaById(parseInt(this.formularioAltaProducto.controls['marca'].value!)) as any

     });

    // console.log(this.formularioAltaProducto.value)

    if(this.formularioAltaProducto.valid){
      this.nuevoProducto = this.formularioAltaProducto.value as any
      
      console.log(this.nuevoProducto)

      this.apiProducto.agregarProducto(this.nuevoProducto).subscribe({
        next: () => {
          Swal.fire("Producto agregado")

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["buscarProducto"]);
          });

        },
        error: (e) => {
          Swal.fire("error al agregar producto " + e.message)
        }
      })


      console.log(this.nuevoProducto);
    } else{
      Swal.fire("Formulario invalido, debe completar los campos")
    }
    
    //ahora limpio lo campos del formulario
    this.formularioAltaProducto.patchValue({
      codigo_barra:"",
      descripcion:"",
      precio_unitario_venta:"",
      precio_unitario_compra:"",
    })

  }

  obtenerTipoProducto(){
    this.apiTipoProducto.obtenerTipoProducto().subscribe({
      next: (item: TipoProducto[]) => {
        this.listaTipoProducto = item;
      },
      error: (e) => {
        Swal.fire("Error al obtener el tipo " + e.message)
      } 
    })
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


  volver(){
    this.router.navigateByUrl("home");
  }

  getTipoProductoById(id: number){
    return this.listaTipoProducto.find(x => x.id == id) ?? {} as TipoProducto;
  }

  getMarcaById(id: number){
    return this.listaMarca.find(x => x.id == id) 
  }


  get getCodigoBarra(){
    return this.formularioAltaProducto.controls["codigo_barra"]
  }

  get getDescripcion(){
    return this.formularioAltaProducto.controls["descripcion"]
  }
}
