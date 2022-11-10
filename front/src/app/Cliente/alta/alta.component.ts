import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/Services/cliente.service';
import {Router} from "@angular/router"
import Swal from "sweetalert2"


@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponentCliente implements OnInit {

  nuevoCliente : Cliente ;

  formularioAltaCliente = new  UntypedFormGroup({
    dni : new UntypedFormControl("",[Validators.required]),
    nombre_apellido : new UntypedFormControl ("", [Validators.required]),
    telefono : new UntypedFormControl("",[Validators.required]),
    direccion : new UntypedFormControl("",[Validators.required]),
    email: new UntypedFormControl("",[Validators.required])
    // cantidad_puntos: new UntypedFormControl("",[Validators.required]),

  })
  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.formularioAltaCliente.valid){
      this.nuevoCliente = this.formularioAltaCliente.value
  
      
      this.clienteService.agregarCliente(this.nuevoCliente).subscribe({
        next: () => {
          Swal.fire("Cliente agregado")
        },
        error: (e) => {
          Swal.fire("Error al agregar cliente " + e.message)
        }
      })


      console.log(this.nuevoCliente);
    } else{
      Swal.fire("Formulario invalido, debe completar los campos")
    }    
  }

  volver(){
    this.router.navigateByUrl("home");
  }

}
