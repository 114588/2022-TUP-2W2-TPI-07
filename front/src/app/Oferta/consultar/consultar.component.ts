import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Ofertas} from "../../models/ofertas"


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  valorBusqueda: string = ""
  valorBuscarProveedor = new FormControl("")
  listadoOfertas: Ofertas[] = [] 


  constructor() { }

  ngOnInit(): void {
  }

  buscarOfertaPorNombre(){

  }

  editar(oferta: Ofertas){

  }
  

  borrar(oferta: Ofertas){
    
  }

}
