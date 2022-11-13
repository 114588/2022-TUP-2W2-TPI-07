import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Rol } from 'src/app/models/Usuario/rol';
import { Usuario } from 'src/app/models/Usuario/usuario';
import {RolService} from "../../Services/rol.service"
import {UsuarioService} from "../../Services/usuario.service"
import Swal from "sweetalert2"
import {Router} from "@angular/router"
import { nombreValidador } from './validador-alta-usuario';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponentUsuario implements OnInit {

  listaRol: Rol[] = [{id:1, rol:"Administrador"}, {id:2, rol:"Caja"}, {id:3, rol:"Compras"}]
  usuario: Usuario = {} as Usuario

  formularioUsuario= this.fb.group({
    legajo: [""],
    nombre: ["", {validators: [Validators.required], asyncValidators: [nombreValidador(this.apiUsuario)], updateOn: 'blur'}],
    rol: ["", Validators.required],
    password: ["", Validators.required],
    repeticionClave: ["", Validators.required]
  })


  constructor(private apiRol: RolService, private apiUsuario: UsuarioService, private router: Router, private fb: FormBuilder) { }

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
      this.usuario.nombre = this.formularioUsuario.controls['nombre'].value!.toString()
      this.usuario.password = this.formularioUsuario.controls['password'].value!
      this.usuario.rol =  this.getRolById(parseInt(this.formularioUsuario.controls["rol"].value!))
   
      console.log(this.formularioUsuario.value)
      this.apiUsuario.agregarUsuario(this.usuario as Usuario).subscribe({
        next: () => {
          Swal.fire("Usuario agregado con éxito")

          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["buscarUsuario"]);
          }); 

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

  get getNombre(){
    return this.formularioUsuario.controls["nombre"]
  }

  volver(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["buscarUsuario"]);
    }); 
  }

 }
