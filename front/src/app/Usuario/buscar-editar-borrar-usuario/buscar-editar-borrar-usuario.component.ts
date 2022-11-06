import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/Usuario/usuario';
import {UsuarioService} from "../../Services/usuario.service"

@Component({
  selector: 'app-buscar-editar-borrar-usuario',
  templateUrl: './buscar-editar-borrar-usuario.component.html',
  styleUrls: ['./buscar-editar-borrar-usuario.component.css']
})
export class BuscarEditarBorrarUsuarioComponent implements OnInit {

  listaUsuarioCompleta: Usuario[] = [];

  constructor(private apiUsuario: UsuarioService) { }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios(){
    this.apiUsuario.obtenerTodos().subscribe({
      next: (item: Usuario[]) => {
        this.listaUsuarioCompleta = item;
      },
      error: (e) => {
        alert("error al obtener usuarios " + e.message)
      }
    })
  }

}
