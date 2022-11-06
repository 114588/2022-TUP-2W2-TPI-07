import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Producto} from "../models/producto"

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  constructor(private http: HttpClient) { }

  obtenerProducto(): Observable<Producto[]>{
    return this.http.get<Producto[]>("http://localhost:8081/productos/listado/")
  }

  agregarProducto(item: Producto): Observable<Producto>{
    return this.http.post<Producto>("http://localhost:8081/productos/alta/",item)
  }

  eliminarProducto(id:number): Observable<any>{
    return this.http.delete("http://localhost:8081/productos/eliminar/"+id)
  }

   modificarProducto( id: number, productoModificado: Producto): Observable<any>{
     return this.http.put("http://localhost:8081/productos/actualizar/"+ id, productoModificado)
    
  }

  buscarProductosPorNombre(nombre: string): Observable<any>{
    return this.http.get("http://localhost:8081/productos/listarNombre/"+ nombre)
  }

}
