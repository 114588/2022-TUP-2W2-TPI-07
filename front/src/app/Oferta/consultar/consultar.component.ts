import { Component, OnInit } from '@angular/core';
import {Ofertas} from "../../models/ofertas"


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit {

  valorBusqueda: string = ""
  listadoOfertas: Ofertas[] = [] 
  banderaMostrarFormulario: boolean  =  false


  constructor() { }

  ngOnInit(): void {
  }

  buscarOfertaPorNombre(){

  }

  modificar(oferta: Ofertas){
    this.banderaMostrarFormulario=true;

  }
  

  borrar(oferta: Ofertas){
    
  }

}
