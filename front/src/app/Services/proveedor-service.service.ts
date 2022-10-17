import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Proveedor} from "../models/proveedor"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorServiceService {

  constructor(private http: HttpClient) { }


 
  obtenerTodos(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>("http://localhost:8081/proveedores")
  }

  agregarProveedor(nuevoProveedor: Proveedor): Observable<Proveedor>{
    return this.http.put<Proveedor>("...",nuevoProveedor)
  }

  eliminarProveedor(id:string): Observable<any>{
    return this.http.delete(".../"+id)
  }

  modificarArticulo(proveedorModificado: Proveedor): Observable<any>{
    return this.http.put(".../"+proveedorModificado.cuil, proveedorModificado)
  }

}
