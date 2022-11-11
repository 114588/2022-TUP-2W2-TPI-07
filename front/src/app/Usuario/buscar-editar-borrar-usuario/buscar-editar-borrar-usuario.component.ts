import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario/usuario';
import {UsuarioService} from "../../Services/usuario.service"
import Swal from "sweetalert2"
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buscar-editar-borrar-usuario',
  templateUrl: './buscar-editar-borrar-usuario.component.html',
  styleUrls: ['./buscar-editar-borrar-usuario.component.css']
})
export class BuscarEditarBorrarUsuarioComponent implements OnInit, OnDestroy {

  listaUsuarioCompleta: Usuario[] = [];
  valorBusqueda = new FormControl();
  suscripcion = new Subscription()
  public p: number = 1

  constructor(private apiUsuario: UsuarioService) { }


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

  buscarUsuario(){
    
  }


  eliminar(item: Usuario){
    this.suscripcion.add(
      this.apiUsuario.eliminarUsuario(item.legajo).subscribe({
        next: () => {
          Swal.fire("Usuario elimando");
          this.obtenerUsuarios();
          
        },
        error:  (e) => {
          Swal.fire("Error al eliminar usuario " + e.message)
        }
      }))
  }

}
