import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userHasRole(role: string) : boolean {
    console.log(localStorage.getItem('rol'));
     return localStorage.getItem('rol') == role;
  }


}
