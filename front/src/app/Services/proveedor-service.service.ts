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
    return this.http.get<Proveedor[]>("http://localhost:8081/proveedores/listado/")
  }

  agregarProveedor(nuevoProveedor: Proveedor): Observable<Proveedor>{
    return this.http.post<Proveedor>("http://localhost:8081/proveedores/alta/",nuevoProveedor)
  }

  eliminarProveedor(id:number): Observable<any>{
    return this.http.delete("http://localhost:8081/proveedores/eliminar/"+id)
  }

/**
 * 
 * @param proveedorModificado 
 * @param proveedorViejo 
 * @returns 
 */
  modificarProveedor(proveedorModificado: Proveedor, proveedorViejo: Proveedor): Observable<any>{
    return this.http.put("http://localhost:8081/proveedor/actualizar/"+ proveedorViejo.id, proveedorModificado)
  }

  buscarProveedorPorNombre(nombre: string): Observable<any>{
    return this.http.get("http://localhost:8081/proveedores/listarNombre/"+ nombre)
  }

}
