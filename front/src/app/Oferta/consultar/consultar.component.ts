import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ofertas} from "../../models/ofertas"
import {FormControl, } from "@angular/forms"
import { debounceTime, Subscription } from 'rxjs';
import {OfertasService} from "../../Services/ofertas.service";
import {Router} from "@angular/router";
 

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css']
})
export class ConsultarComponent implements OnInit, OnDestroy {

  valorBuscado: string = ""
  listadoOfertasBuscadas: Ofertas[];
  ofertaBuscada: Ofertas;
  banderaListadoOfertas: boolean

  listadoOfertas: Ofertas[] = [] 
  banderaMostrarFormulario: boolean  =  false
  suscripcion = new Subscription();

  constructor(private apiOfertas: OfertasService, private router: Router) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {  }


  buscarOfertaPorNombre(){
    this.apiOfertas.buscarOfertaPorNombre(this.valorBuscado).subscribe({
      next: (item: Ofertas) => {
        if(item ==null){
          alert ("proveedor no encontrado")
        } else {
          this.ofertaBuscada = item
          this.banderaListadoOfertas=true
          this.valorBuscado = ""
        }
      },
      error: (e) => {
        console.log(e)
        alert ("error al buscar ofertas: " + e.message)
      }
    })

  }

  modificar(oferta: Ofertas){
    this.banderaMostrarFormulario=true;

  }
  

  borrar(oferta: Ofertas){
    this.apiOfertas.eliminarOferta(this.ofertaBuscada.id).subscribe({
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

}
