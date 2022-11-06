import { Injectable } from '@angular/core';
import { Login } from '../models/Usuario/login';
import {HttpClient} from "@angular/common/http"
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(nombre: string, pass: string): Observable<Login>{
    return this.http.get<Login>("http://localhost:8081/usuarios/login/" +nombre+"/" +pass)
  }
}
