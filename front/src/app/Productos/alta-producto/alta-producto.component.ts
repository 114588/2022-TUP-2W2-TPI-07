import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import {ProductoService} from "../../Services/producto.service"

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent implements OnInit {
  nuevoProducto : Producto ;

  formularioAltaProducto = new  UntypedFormGroup({
    codigo : new UntypedFormControl("",[Validators.required]),
    descripcion : new UntypedFormControl ("", [Validators.required]),
    id_tipo : new UntypedFormControl("",[Validators.required]),
    precio_unitario_venta : new UntypedFormControl("",[Validators.required]),
    precio_unitario_compra: new UntypedFormControl("",[Validators.required])
    // cantidad_puntos: new UntypedFormControl("",[Validators.required]),

  })
  constructor(private apiProducto: ProductoService, private router: Router) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.formularioAltaProducto.valid){
      this.nuevoProducto = this.formularioAltaProducto.value
  
      
      this.apiProducto.agregarProducto(this.nuevoProducto).subscribe({
        next: () => {
          alert("cliente agregado")
        },
        error: (e) => {
          alert("error al agregar cliente " + e.message)
        }
      })


      console.log(this.nuevoProducto);
    } else{
      alert("formulario invalido, debe completar los campos")
    }    
  }

  volver(){
    this.router.navigateByUrl("home");
  }

}
