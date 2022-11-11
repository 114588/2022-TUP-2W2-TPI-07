import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../models/marca';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private http: HttpClient) { }

  obtenerTodos(): Observable<Marca[]>{
    return this.http.get<Marca[]>("http://localhost:8081/marcas/listardo")
  }
}
