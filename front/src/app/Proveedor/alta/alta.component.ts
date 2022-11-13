import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import { Subscription } from 'rxjs';
import {Proveedor} from "../../models/proveedor";
import {ProveedorServiceService} from "../../Services/proveedor-service.service"
import {Router} from "@angular/router"
import Swal from "sweetalert2";
import {nombreValidador} from "../../Proveedor/alta/validador-alta-proveedor-cuit"

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponentProveedor implements OnInit {

  nuevoProveedor: Proveedor ;

  formularioAltaProveedor = this.fb.group({
    //http://estilow3b.com/ejemplos-comunes-de-expresiones-regulares-javascript/
    nombre : ["",Validators.pattern(/^[a-zA-Z áéíóú]+$/)], //solo letras
   
    cuit : ["",{validators: [Validators.required, Validators.pattern(/^\d{11}$/)], asyncValidators: [nombreValidador(this.apiProveedor)], updateOn: 'blur'}], //solo numeros y deben ser 11
   
    telefono : ["",[Validators.required, Validators.pattern(/^\d{10}$/)]], //solo numeros yy debenn ser 7
    // pais : new UntypedFormControl("",[Validators.required]),
    direccion: ["", [Validators.required, Validators.pattern(/^[a-zA-Z0-9,áéíóú ]+$/)]], //solo letras y numeros
    codigo_postal: ["", [Validators.required, Validators.pattern(/^\d{4}$/)]], //solo numeros y deben ser 4 
    email: ["", [Validators.required, Validators.email]],
  })

  

  
  constructor(private apiProveedor: ProveedorServiceService, private router: Router, private fb: FormBuilder) { 
    
  }

  ngOnInit(): void {

  }
  

  guardar(){
    if(this.formularioAltaProveedor.valid){
      this.nuevoProveedor = this.formularioAltaProveedor.value as any
      //https://blog.angular.io/angular-v14-is-now-available-391a6db736af  UntypedFormControl y UntypedFormGroup
      
      this.apiProveedor.agregarProveedor(this.nuevoProveedor).subscribe({
        next: () => {
          Swal.fire("Proveedor agregado")

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["buscarProveedor"]);
          });

        },
        error: (e) => {
          Swal.fire("Error al agregar proveedor " + e.message )
        }
      })


      console.log(this.nuevoProveedor);
    } else{
      Swal.fire("Formulario invalido, debe completar los campos")
    }    
  }

  volver(){
    this.router.navigateByUrl("home");
  }

  get getNombre(){
    return this.formularioAltaProveedor.controls["cuit"]
  }


}
