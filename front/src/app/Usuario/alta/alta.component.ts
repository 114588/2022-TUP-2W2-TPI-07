import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/Services/usuario.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponentUsuario implements OnInit {

  nuevoUsuario : Usuario ;

  formularioAltaUsuario = new  UntypedFormGroup({
    
    nombre : new UntypedFormControl ("", [Validators.required]),
    contraseña : new UntypedFormControl("",[Validators.required]),
    rol : new UntypedFormControl("",[Validators.required]),
   

  })
  constructor(private UsuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
  }

  guardar(){
    if(this.formularioAltaUsuario.valid){
      this.nuevoUsuario = this.formularioAltaUsuario.value
  
      
      this.UsuarioService.agregarUsuario(this.nuevoUsuario).subscribe({
        next: () => {
          alert("Usuario agregado")
        },
        error: () => {
          alert("error al agregar Usuario")
        }
      })


      console.log(this.nuevoUsuario);
    } else{
      alert("formulario invalido, debe completar los campos")
    }    
  }

  volver(){
    this.router.navigateByUrl("home");
  }

}


  


