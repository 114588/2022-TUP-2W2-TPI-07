import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipo-producto';
import {ProductoService} from "../../Services/producto.service"
import {TipoProductoService} from "../../Services/tipo-producto.service"
import Swal from "sweetalert2"
import { Marca } from 'src/app/models/marca';
import {MarcaService} from "../../Services/marca.service"

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

  formularioAltaProducto = new  UntypedFormGroup({
    codigo_barra : new UntypedFormControl("", [Validators.required, Validators.pattern(/^\d{4}$/)] ), //solo numeros y deben ser 4
    descripcion : new UntypedFormControl ("", [Validators.required]),
    tipoProducto : new UntypedFormControl("",[Validators.required]),
    precio_unitario_venta : new UntypedFormControl("",[Validators.required]),
    precio_unitario_compra: new UntypedFormControl("",[Validators.required]),
    marca: new UntypedFormControl("", Validators.required)

  })
  constructor(private apiProducto: ProductoService, private router: Router, private apiTipoProducto: TipoProductoService, private apiMarca: MarcaService) { }

  ngOnInit(): void {
    this.obtenerTipoProducto();
    this.obtenerMarca();
  }

  guardar(){

    //aca lo que hago es: con el id, buscar el objeto completo y ese objeto ponerlo en la propiedad
    this.formularioAltaProducto.patchValue({
      tipoProducto: this.getTipoProductoById(this.formularioAltaProducto.controls["tipoProducto"].value),
      marca: this.getMarcaById(this.formularioAltaProducto.controls['marca'].value)
    });

    // console.log(this.formularioAltaProducto.value)

    if(this.formularioAltaProducto.valid){
      this.nuevoProducto = this.formularioAltaProducto.value
      
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

}
