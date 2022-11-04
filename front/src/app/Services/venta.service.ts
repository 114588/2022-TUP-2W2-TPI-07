import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/Ventas/cliente';
import { Factura } from '../models/Ventas/factura';
import { Producto } from '../models/Ventas/producto';
import { TipoProducto } from '../models/Ventas/tipo-producto';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  constructor(private http: HttpClient) { }

  
  obtenerClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>("http://localhost:8081/clientes/listado/")
  }

  obtenerTipoProducto(): Observable<TipoProducto[]>{
    return this.http.get<TipoProducto[]>("http://localhost:8081/tipoProducto/listado/")
  }

  obtenerTodosProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>("http://localhost:8081/productos/listado/")
  }

  guardarFactura(factura: Factura): Observable<any>{
    return  this.http.post<Factura>("http://localhost:8081/facturas/alta/", factura)
  }
}
