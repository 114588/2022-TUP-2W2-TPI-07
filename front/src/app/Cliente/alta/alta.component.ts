import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/Services/cliente.service';
import {Router} from "@angular/router"
import Swal from "sweetalert2";
import {nombreValidador} from "../../Cliente/alta/validador-alta-cliente-dni"

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponentCliente implements OnInit {

  nuevoCliente : Cliente ;

  formularioAltaCliente = this.fb.group({
    dni : ["", {validators: [Validators.required], asyncValidators: [nombreValidador(this.apiCliente)], updateOn: 'blur'}],
    nombre_apellido : ["", [Validators.required]],
    telefono : ["",[Validators.required]],
    direccion : ["",[Validators.required]],
    email: ["",[Validators.required]]
    // cantidad_puntos: new UntypedFormControl("",[Validators.required]),

  })
  constructor(private apiCliente: ClienteService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.formularioAltaCliente.valid){
      this.nuevoCliente = this.formularioAltaCliente.value as any
  
      
      this.apiCliente.agregarCliente(this.nuevoCliente).subscribe({
        next: () => {
          Swal.fire("Cliente agregado")

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["buscarCliente"]);
          });
          
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
  
  get getNombre(){
    return this.formularioAltaCliente.controls["dni"]
  }
}
