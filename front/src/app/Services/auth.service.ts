import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private administrador = new BehaviorSubject<boolean> (false)
  private otro = new BehaviorSubject<boolean> (false)

  constructor() { 
    this.checkAdministrador()
  }

  get isAdministrador(): Observable<boolean>{
    return this.administrador.asObservable();
  }

  get isOtro(): Observable<boolean>{
    return this.otro.asObservable();
  }
  
  checkAdministrador(): Observable<any> {
    if(localStorage.getItem("rol") == "Administrador"){
      return this.administrador
    }
      return this.otro;
   
  }
}
