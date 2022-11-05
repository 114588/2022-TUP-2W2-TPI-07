import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {TipoProducto} from "../models/tipo-producto"

@Injectable({
  providedIn: 'root'
})
export class TipoProductoService {
  constructor(private http: HttpClient) { }

  obtenerTipoProducto(): Observable<TipoProducto[]>{
    return this.http.get<TipoProducto[]>("http://localhost:8081/tipoProducto/listado/")
  }
}
