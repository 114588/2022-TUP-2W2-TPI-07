import { Component, OnInit } from '@angular/core';
import {Proveedor} from "../../models/proveedor"

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponentProveedor implements OnInit {

  proveedor: Proveedor =  {} as Proveedor
  listaProveedor : Proveedor[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
