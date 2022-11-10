import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    legajo: new FormControl(),
    nombre: new FormControl(),
    rol: new FormControl()
  })


  constructor(private apiRol: RolService, private apiUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerRol()
  }

  obtenerRol(){
    this.listaRol
  }

  guardar(){
    this.formularioUsuario.patchValue({
      rol: this.getRolById(this.formularioUsuario.controls["rol"].value)
    })
    
    this.usuario = this.formularioUsuario.value as Usuario

    console.log(this.formularioUsuario.value)
    this.apiUsuario.agregarUsuario(this.formularioUsuario.value as Usuario).subscribe({
      next: () => {
      },
      error: (e) => {
        Swal.fire("Error " + e.message)
      }
    })

    this.formularioUsuario.patchValue({
      legajo: "",
      nombre: ""
    })

  }


  getRolById(id: number){
    return this.listaRol.find(x => x.id == id) ?? {} as Rol 
  }

  volver(){
    
  }

 }
