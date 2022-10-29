import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ofertas} from "../../models/ofertas"
import {FormControl, } from "@angular/forms"
import { debounceTime, Subscription } from 'rxjs';
import {OfertasService} from "../../Services/ofertas.service";
import {Router} from "@angular/router";
import {OfertaModificado} from "../../models/oferta-modificado"
import { JsonPipe } from '@angular/common';
 

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit, OnDestroy {

  valorBuscado: string = ""
  listadoOfertasBuscadas: Ofertas[] = [];
  ofertaBuscada: Ofertas = {} as Ofertas  ;
  ofertaParaModificar: OfertaModificado = {} as  OfertaModificado;
  banderaListadoOfertas: boolean

  listadoOfertas: Ofertas[] = [] 
  banderaFormularioEdicion: boolean  =  false
  suscripcion = new Subscription();

  constructor(private apiOfertas: OfertasService, private router: Router) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {  }

// =============== BUSCAR ================
  buscarOfertaPorNombre(){
    this.apiOfertas.buscarOfertaPorNombre(this.valorBuscado).subscribe({
      next: (item: Ofertas) => {
        if(item ==null){
          alert ("oferta no encontrada")
        } else {
          // this.ofertaBuscada = item
          this.listadoOfertas= []; //limpio la lista por si tiene otros  valores de antes
          this.listadoOfertasBuscadas.push(item); //guardo el elemento encontrado de la api en la lista
          this.banderaListadoOfertas=true;  //muestro el listado de las ofertas encontradas
          this.valorBuscado = "" //limpio el texto que se ingreso en la busqueda
        }
      },
      error: (e) => {
        console.log(e)
        alert ("error al buscar ofertas: " + e.message)
      }
    })

  }

  // ============== FUNCIONES DEL LISTADO ==============
  elegidoParaEditar(item:Ofertas){
    this.banderaFormularioEdicion=true
    this.ofertaBuscada = Object.assign({}, item)
  }

  borrar(item: Ofertas){
    this.apiOfertas.eliminarOferta(item.id).subscribe({
      next: () => {
        alert("articulo borrado correctamente")
        this.valorBuscado = ""

        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(["ofertas"]);
        }); 

      },
      error: (e) => {
        alert("error al borrar " + e.message)
      }
    })
  }


  // =============== FUNCIONES DEL FORMULARIO MODIFICAR ==================

  modificarDesdeFormulario(){   

    this.ofertaParaModificar.codigo_producto = this.ofertaBuscada.codigo_producto;
    this.ofertaParaModificar.descripcion= this.ofertaBuscada.descripcion;
    this.ofertaParaModificar.cantidad_puntos =  this.ofertaBuscada.cantidad_puntos;
    this.ofertaParaModificar.beneficio =  this.ofertaBuscada.beneficio;
    this.ofertaParaModificar.fecha_inicio = this.ofertaBuscada.fecha_inicio;
    this.ofertaParaModificar.fecha_fin = this.ofertaBuscada.fecha_fin;

    console.log(this.ofertaParaModificar)
    console.log(this.ofertaBuscada)

    this.apiOfertas.modificarOferta(this.ofertaParaModificar, this.ofertaBuscada).subscribe({
      next: () => {
        alert("modificacion exitosa")
        this.banderaFormularioEdicion = false;
      },
      error: (e) => {
        alert(e.message)
      }
    })

  }
  

  
}
