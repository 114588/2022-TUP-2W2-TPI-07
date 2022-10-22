import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ofertas} from "../../models/ofertas"
import {FormControl, } from "@angular/forms"
import { debounceTime, Subscription } from 'rxjs';


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit, OnDestroy {

  busqueda = new FormControl('')
  listadoOfertas: Ofertas[] = [] 
  banderaMostrarFormulario: boolean  =  false
  suscripcion = new Subscription();

  constructor() { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
    this.metodoBuscar();

  }

//https://www.youtube.com/watch?v=u-LcW9FsMac&list=LL&index=3
metodoBuscar(){
  this.suscripcion.add(
    this.busqueda.valueChanges.pipe(debounceTime(300)).subscribe({
      next: (data) => {
        console.log(data) 
        //aca enviar al buscar de la api y continuar con toda la logica

      },
      error: () => {
        alert ("error al buscar")
      }
    }))
}

  buscarOfertaPorNombre(){

  }

  modificar(oferta: Ofertas){
    this.banderaMostrarFormulario=true;

  }
  

  borrar(oferta: Ofertas){
    
  }

}
