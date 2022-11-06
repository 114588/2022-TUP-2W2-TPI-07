import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/Usuario/login';
import {LoginService} from "../../Services/login.service"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin= new FormGroup({
    nombre: new FormControl(),
    pass: new FormControl()
  })

  nuevoLogin: Login = {} as Login

  constructor(private apiLogin: LoginService) { }

  ngOnInit(): void {
  }

  login(){
    this.nuevoLogin = this.formularioLogin.value
    this.apiLogin.login(this.formularioLogin.controls["nombre"].value, this.formularioLogin.controls["pass"].value).subscribe({
      next: (item: any) => {
        console.log(item)
        alert("Exito")
      },
      error: () => {
        alert("error")
      }
    })
  }

}
