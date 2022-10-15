import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import {Proveedor} from "../../models/proveedor";
import {ProveedorServiceService} from "../../Services/proveedor-service.service"

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponentProveedor implements OnInit {

  nuevoProveedor: Proveedor ;

  formularioAltaProveedor = new  UntypedFormGroup({
    nombre : new UntypedFormControl("",[Validators.required]),
    cuil : new UntypedFormControl ("", [Validators.required]),
    telefono : new UntypedFormControl("",[Validators.required]),
    pais : new UntypedFormControl("",[Validators.required]),
    direccion: new UntypedFormControl("",[Validators.required]),
    codigoPostal: new UntypedFormControl("",[Validators.required]),
    correo: new UntypedFormControl("",[Validators.required])
  })

  
  constructor(private proveedorService: ProveedorServiceService) { 
    
  }

  ngOnInit(): void {

  }
  

  guardar(){
    if(this.formularioAltaProveedor.valid){
      this.nuevoProveedor = this.formularioAltaProveedor.value
      //https://blog.angular.io/angular-v14-is-now-available-391a6db736af  UntypedFormControl y UntypedFormGroup

      console.log(this.nuevoProveedor);
    } else{
      alert("formulario invalido, debe completar los campos")
    }

    
  }


}
