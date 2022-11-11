import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {OrdenCompra} from "../models/OrdenCompra/orden-compra"


@Injectable({
  providedIn: 'root'
})
export class OrdenCompraService {

  constructor(private http: HttpClient) { }

  agregarOrdenCompra(item: OrdenCompra): Observable<any>{
    return this.http.post("http://localhost:8081/ordenes/alta",  item)
  }

  obtenerOrdenCompra(): Observable<any>{
    return this.http.get("http://localhost:8081/ordenes/listado")
  }

  buscarOrdenCompraPorNombre(nombre: string): Observable<any>{
    return this.http.get("http://localhost:8081/ordenes/buscarId/"+ nombre)
  }


}


