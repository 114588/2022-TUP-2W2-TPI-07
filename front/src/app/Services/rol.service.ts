import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Rol} from "../models/Usuario/rol"
import {HttpClient} from "@angular/common/http"
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rol:[{id:1, rol:"Administrador"}, {id:2, rol:"Caja"}, {id:3, rol:"Compras"}]

  constructor(private http: HttpClient) {
    
   }

  listadoRol(){
    
  }
}
