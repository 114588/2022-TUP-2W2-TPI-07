import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../models/Ventas/factura';
import {HttpClient} from "@angular/common/http"

@Injectable({
  providedIn: 'root'
})
export class ReporteVentasService {

  constructor(private http: HttpClient) { }

  obtenerTodos(fecha1: string, fecha2: string): Observable<Factura[]>{
    return this.http.get<Factura[]>("http://localhost:8081/facturas/porFechas/" + fecha1 +"/"+ fecha2)
  }

  obtenerPorFechaMontos(fecha1: string, fecha2: string): Observable<Factura[]>{
    return this.http.get<Factura[]>("http://localhost:8081/facturas/montosPorFecha/" + fecha1 +"/"+ fecha2)
  }
}

