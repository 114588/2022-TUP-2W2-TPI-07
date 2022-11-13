import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario/usuario';
import {UsuarioService} from "../../Services/usuario.service"
import Swal from "sweetalert2"
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import {Router} from "@angular/router"
import {RolService} from "../../Services/rol.service"
import { Rol } from 'src/app/models/Usuario/rol';
import { ThemeService } from 'ng2-charts';


@Component({
  selector: 'app-buscar-editar-borrar-usuario',
  templateUrl: './buscar-editar-borrar-usuario.component.html',
  styleUrls: ['./buscar-editar-borrar-usuario.component.css']
})
export class BuscarEditarBorrarUsuarioComponent implements OnInit, OnDestroy {

  listaUsuarioCompleta: Usuario[] = [];
  listaBusqueda: Usuario []  = []
  listaRol: Rol[] = [{id:1, rol:"Administrador"}, {id:2, rol:"Caja"}, {id:3, rol:"Compras"}]
  valorBusqueda = new FormControl();
  suscripcion = new Subscription()
  banderaListadoCompleto: boolean = true;
  banderaListadoBusqueda: boolean = false
  banderaEditar: boolean =  false;
  public p: number = 1
  usuario: Usuario = {} as Usuario


  formularioEdicion= this.fb.group({
    legajo: new FormControl(),
    nombre: new FormControl(),
    rol: new FormControl(),
    password: new FormControl()
   
  })

  constructor(private apiUsuario: UsuarioService, private router: Router, private apiRol: RolService, private fb: FormBuilder) { }


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios(){
    this.suscripcion.add(
      this.apiUsuario.obtenerTodos().subscribe({
        next: (item: Usuario[]) => {
          this.listaUsuarioCompleta = item;
        },
        error: (e) => {
          Swal.fire("Error al obtener usuarios " + e.message)
        }
      }))
  }

  obtenerRol(){
    this.listaRol
  }

  buscarUsuario(){

    if(this.valorBusqueda.value == ""){
      this.obtenerUsuarios(); //traigo toda la lsita
      this.banderaListadoBusqueda=false;
      this.banderaListadoCompleto = true
     } else { 

    this.apiUsuario.buscar(this.valorBusqueda.value).subscribe({
      next: (item : Usuario[]) => {
        this.listaBusqueda =  item
        this.banderaListadoCompleto = false
        this.banderaListadoBusqueda = true
      },
      error:  (e) => {
        Swal.fire("Error al buscar usuario " + e.message)
      }
      })
    }
  }

  eliminar(item: Usuario){
    this.suscripcion.add(
      this.apiUsuario.eliminarUsuario(item.legajo!).subscribe({
        next: () => {
          Swal.fire("Usuario elimando");
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(["buscarUsuario"]);
          }); 
          
        },
        error:  (e) => {
          Swal.fire("Error al eliminar usuario " + e.message)
        }
      }))
  }

  editar(item: Usuario){
    this.banderaEditar= true
    console.log(item)
    
    this.formularioEdicion.setValue({
      legajo: item.legajo,
      nombre: item.nombre,
      rol: item.rol.id,
      password: item.password
    }) 
    // console.log(item)
  }


  getRolById(id: number){
    return this.listaRol.find(x => x.id == id)
  }

  volver(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["buscarUsuario"]);
    }); 
  }

  guardar(){
    //del id obtengo el objeto de roles
    this.formularioEdicion.patchValue({
      rol: this.getRolById(this.formularioEdicion.controls['rol'].value)
    })

    //asigno al usuario todos los valores del formulario
    this.usuario = this.formularioEdicion.value as Usuario
    console.log(this.usuario)

    //envio a la api
    this.apiUsuario.modificarUsuario(this.formularioEdicion.controls['legajo'].value, this.usuario).subscribe({
      next: () => {
        Swal.fire("Usuario modificado")

        this.banderaEditar= false
        this.banderaListadoCompleto=false
        this.buscarUsuario()
        this.banderaListadoBusqueda=true
    
        
      },
      error: (e) => {
        Swal.fire("Error al modificar usuario " + e.message)
      } 
    })
  }
}

