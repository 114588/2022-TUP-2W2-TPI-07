import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/Ventas/factura';
import {HttpClient} from "@angular/common/http"
import { RespuestaApiModel } from '../Consultas/reporte-mas-vendidos/respuesta-api-model';
import {RespuestaApiModelCliente} from "../Consultas/reporte-ventas/respuesta-api-model"

@Injectable({
  providedIn: 'root'
})
export class ReporteVentasService {

  constructor(private http: HttpClient) { }

  obtenerTodos(fecha1: string, fecha2: string): Observable<Factura[]>{
    return this.http.get<Factura[]>("http://localhost:8081/facturas/porFechas/" + fecha1 +"/"+ fecha2)
  }

  obtenerPorFechaMontos(id: number, fecha1: string, fecha2: string): Observable<RespuestaApiModelCliente[]>{
    return this.http.get<RespuestaApiModelCliente[]>("http://localhost:8081/facturas/montosPorFecha/" + id + "/" + fecha1 +"/"+ fecha2)
  }


  obtenerMasVendidos(fecha1: string, fecha2: string): Observable<RespuestaApiModel[]>{
    return this.http.get<RespuestaApiModel[]>("http://localhost:8081/ordenes/masVendidos/" + fecha1 +"/"+ fecha2)
  }
}

