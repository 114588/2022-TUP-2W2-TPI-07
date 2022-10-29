import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http"
import {Ofertas} from "../models/ofertas"
import {OfertaModificado} from  "../models/oferta-modificado"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) { }


  obtenerTodos(): Observable<Ofertas[]>{
    return this.http.get<Ofertas[]>("http://localhost:8081/ofertas/listado/")
  }

  buscarOfertaPorNombre(nombre: string): Observable<any>{
    return this.http.get("http://localhost:8081/ofertas/buscarNombre/"+ nombre)
 }


  modificarOferta(ofertaModificado: OfertaModificado, ofertaViejo: Ofertas): Observable<any>{
    return this.http.put("http://localhost:8081/ofertas/actualizar/"+ ofertaViejo.id, ofertaModificado)
  }

  eliminarOferta(id:number): Observable<any>{
    return this.http.delete("http://localhost:8081/ofertas/eliminar/"+id)
  }

  agregarOferta(nuevaOferta: Ofertas): Observable<Ofertas>{
    return this.http.post<Ofertas>("http://localhost:8081/ofertas/alta/",nuevaOferta)
  }


}
