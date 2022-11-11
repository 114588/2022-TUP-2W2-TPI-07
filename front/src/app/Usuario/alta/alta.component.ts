import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/Usuario/rol';
import { Usuario } from 'src/app/models/Usuario/usuario';
import {RolService} from "../../Services/rol.service"
import {UsuarioService} from "../../Services/usuario.service"
import Swal from "sweetalert2"

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponentUsuario implements OnInit {

  listaRol: Rol[] = [{id:1, rol:"Administrador"}, {id:2, rol:"Caja"}, {id:3, rol:"Compras"}]
  usuario: Usuario = {} as Usuario

  formularioUsuario= new FormGroup({
    legajo: new FormControl("", Validators.required),
    nombre: new FormControl("", Validators.required),
    rol: new FormControl(),
    password: new FormControl("", Validators.required),
    repeticionClave: new FormControl("", Validators.required)
  })


  constructor(private apiRol: RolService, private apiUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerRol()
  }

  obtenerRol(){
    this.listaRol
  }

  guardar(){
    if(this.formularioUsuario.controls['password'].value != this.formularioUsuario.controls['repeticionClave'].value){
      Swal.fire("Las claves deben coincidir")

    } else {
      this.usuario.legajo = parseInt( this.formularioUsuario.controls['legajo'].value!)
      this.usuario.nombre = this.formularioUsuario.controls['nombre'].value!
      this.usuario.password = this.formularioUsuario.controls['password'].value!
      this.usuario.rol =  this.getRolById(this.formularioUsuario.controls["rol"].value)
  
      console.log(this.formularioUsuario.value)
      this.apiUsuario.agregarUsuario(this.usuario as Usuario).subscribe({
        next: () => {
          Swal.fire("Usuario agregado con exito")
        },
        error: (e) => {
          Swal.fire("Error " + e.message)
        }
      })
  
      this.formularioUsuario.patchValue({
        legajo: "",
        nombre: "",
        password: "",
        repeticionClave: ""
      })
    }
    


  }


  getRolById(id: number){
    return this.listaRol.find(x => x.id == id) ?? {} as Rol 
  }

  volver(){
    
  }

 }
