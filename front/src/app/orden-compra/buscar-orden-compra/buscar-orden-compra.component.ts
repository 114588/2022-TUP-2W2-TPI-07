import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OrdenCompra } from 'src/app/models/OrdenCompra/orden-compra';
import { Proveedor } from 'src/app/models/proveedor';
import  {ProveedorServiceService} from "../../Services/proveedor-service.service"
import {OrdenCompraService} from "../../Services/orden-compra.service"
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import {Router} from "@angular/router"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-buscar-orden-compra',
  templateUrl: './buscar-orden-compra.component.html',
  styleUrls: ['./buscar-orden-compra.component.css']
})
export class BuscarOrdenCompraComponent implements OnInit, OnDestroy {

  listaOrdenesCompra: OrdenCompra[] = []
  listaOrdenesCompraBuscada: OrdenCompra[] = []
  listaProveedores: Proveedor[] = []
  banderaListadoCompleto: boolean = true;
  banderaListadoBusqueda: boolean = false
  suscripcion =new Subscription()
  public p: number = 1
  valorBusqueda= new FormControl("");
  @ViewChild("imprimir") myData!: ElementRef;

  constructor(private apiProveedor: ProveedorServiceService, private apiOrdenCompra: OrdenCompraService, private router: Router) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.obtenerListaProveedores();
    this.obtenerListaOrdenesCompra();
  }


  obtenerListaOrdenesCompra(){
    this.suscripcion.add(
      this.apiOrdenCompra.obtenerOrdenCompra().subscribe({
        next: (item: OrdenCompra[]) => {
          this.listaOrdenesCompra = item;
        },
        error: (e) => {
          Swal.fire('Error al obtener listado ' + e.message);
        }
      })
    )
  }

  obtenerListaProveedores() {
    this.suscripcion.add(
      this.apiProveedor.obtenerTodos().subscribe({
        next: (proveedores: Proveedor[]) => {
          this.listaProveedores = proveedores  ;
        },
        error: (e) => {
          Swal.fire('Error al obtener listado ' + e.message);
        },
      })
    );
  }


  buscarOrdenCompra(){
    if(this.valorBusqueda.value == ""){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["buscarOrdenCompra"]);
      }); 
    } else {

      this.suscripcion.add(
        this.apiOrdenCompra.buscarOrdenCompraPorNombre(this.valorBusqueda.value!).subscribe({
          next: (item: OrdenCompra[]) => {
            console.log(item)
            this.banderaListadoCompleto = false
            this.banderaListadoBusqueda = true
            this.listaOrdenesCompraBuscada = item;

          },
          error: (e) => {
            Swal.fire('Error al obtener listado ' + e.message);
          },
        })
      )
    }
  }

  exportarPdf(){
    var data = document.getElementById('imprimir');
  if(data !== null) {
    html2canvas(data).then(canvas => {  
      // https://www.youtube.com/watch?v=Eh6StPjcWjE 
      let imgWidth = 208;   
      let imgHeight = canvas.height * imgWidth / canvas.width;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 5;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('reporteCompras'); // Generated PDF   
    });
  }
}
}