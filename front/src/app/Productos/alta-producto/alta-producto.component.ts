import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { TipoProducto } from 'src/app/models/tipo-producto';
import {ProductoService} from "../../Services/producto.service"
import {TipoProductoService} from "../../Services/tipo-producto.service"

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
  nuevoProducto : Producto ;
  listaTipoProducto: TipoProducto[] = [];
  tipoProductoSeleccionado: TipoProducto = {} as TipoProducto;

  formularioAltaProducto = new  UntypedFormGroup({
    codigo : new UntypedFormControl("",[Validators.required]),
    descripcion : new UntypedFormControl ("", [Validators.required]),
    tipoProducto : new UntypedFormControl("",[Validators.required]),
    precio_unitario_venta : new UntypedFormControl("",[Validators.required]),
    precio_unitario_compra: new UntypedFormControl("",[Validators.required])

  })
  constructor(private apiProducto: ProductoService, private router: Router, private apiTipoProducto: TipoProductoService) { }

  ngOnInit(): void {
    this.obtenerTipoProducto();
  }

  guardar(){

    //aca lo que hago es: con el id, buscar el objeto completo y ese objeto ponerlo en la propiedad
    this.formularioAltaProducto.patchValue({
      tipoProducto: this.getTipoProductoById(this.formularioAltaProducto.controls["tipoProducto"].value)
    });

    // console.log(this.formularioAltaProducto.value)

    if(this.formularioAltaProducto.valid){
      this.nuevoProducto = this.formularioAltaProducto.value
      
      console.log(this.nuevoProducto)

      this.apiProducto.agregarProducto(this.nuevoProducto).subscribe({
        next: () => {
          alert("producto agregado")
        },
        error: (e) => {
          alert("error al agregar producto " + e.message)
        }
      })


      console.log(this.nuevoProducto);
    } else{
      alert("formulario invalido, debe completar los campos")
    }
    
    //ahora limpio lo campos del formulario
    this.formularioAltaProducto.patchValue({
      codigo:"",
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
        alert("error al obtener el tipo " + e.message)
      } 
    })
  }


  volver(){
    this.router.navigateByUrl("home");
  }

  getTipoProductoById(id: number){
    return this.listaTipoProducto.find(x => x.id == id) ?? {} as TipoProducto;
  }

}
