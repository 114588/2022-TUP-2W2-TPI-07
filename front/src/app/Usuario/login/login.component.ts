import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/Usuario/login';
import {LoginService} from "../../Services/login.service"
import {Router} from "@angular/router"
import Swal from "sweetalert2"

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

  constructor(private apiLogin: LoginService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem("legajo");
    localStorage.removeItem("nombre");
    localStorage.removeItem("rol");
    localStorage.removeItem("usuarioCompleto");

  }

  login(){
    this.nuevoLogin = this.formularioLogin.value
    this.apiLogin.login(this.formularioLogin.controls["nombre"].value, this.formularioLogin.controls["pass"].value).subscribe({
      next: (item: any) => {
        console.log(item)
        localStorage.setItem("legajo", item.legajo)
        localStorage.setItem("nombre", item.nombre)
        localStorage.setItem("rol", item.rol.rol)
        localStorage.setItem("usuarioCompleto", JSON.stringify(item))

        this.router.navigateByUrl("venta");

      },
      error: (e) => {
        Swal.fire("error " + e.message)
      }
    })
  }

}
