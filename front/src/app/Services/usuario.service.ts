import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }


 

  agregarUsuario(nuevoCliente: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>("http://localhost:8081/Usuarios/alta/",nuevoCliente)
  }
}
