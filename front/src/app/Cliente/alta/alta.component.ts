import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms"
import { Cliente } from 'src/app/models/cliente';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponentCliente implements OnInit {

  nuevoCliente : Cliente ;

  formularioAltaCliente = new  UntypedFormGroup({
    dni : new UntypedFormControl("",[Validators.required]),
    nombre : new UntypedFormControl ("", [Validators.required]),
    telefono : new UntypedFormControl("",[Validators.required]),
    direccion : new UntypedFormControl("",[Validators.required]),
    correo: new UntypedFormControl("",[Validators.required]),
    cantPuntos: new UntypedFormControl("",[Validators.required])
  })
  constructor() { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.formularioAltaCliente.valid){
      this.nuevoCliente = this.formularioAltaCliente.value
      //https://blog.angular.io/angular-v14-is-now-available-391a6db736af  UntypedFormControl y UntypedFormGroup

      console.log(this.nuevoCliente);
    } else{
      alert("formulario invalido, debe completar los campos")
    }

  }

}
