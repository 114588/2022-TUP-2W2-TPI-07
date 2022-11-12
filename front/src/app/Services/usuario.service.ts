import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


  obtenerTodos(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>("http://localhost:8081/usuarios/listado/")
  }

  agregarUsuario(nuevoCliente: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>("http://localhost:8081/usuarios/alta/",nuevoCliente)
  }

  eliminarUsuario(id: number): Observable<any>{
    return this.http.delete("http://localhost:8081/usuarios/eliminar/"+id)
  }


  buscar(item: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>("http://localhost:8081/usuarios/listarNombre/" + item)
  }

  modificarUsuario( id: number, usuarioModificado: Usuario): Observable<any>{
    return this.http.put("http://localhost:8081/usuario/actualizar/"+ id, usuarioModificado)
   
 }


}
