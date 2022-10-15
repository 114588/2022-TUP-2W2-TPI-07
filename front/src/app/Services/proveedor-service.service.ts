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
}
