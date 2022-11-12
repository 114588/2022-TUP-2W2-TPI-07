import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Factura } from 'src/app/models/Ventas/factura';
import Swal from 'sweetalert2';
import {VentaService} from "../../Services/venta.service"
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-listado-ventas',
  templateUrl: './listado-ventas.component.html',
  styleUrls: ['./listado-ventas.component.css']
})
export class ListadoVentasComponent implements OnInit {

  suscripcion = new Subscription()
  listadoVenta : Factura[] = []
  public p: number = 1


  @ViewChild("imprimir") myData!: ElementRef;

  
  constructor( private apiiVenta: VentaService) { }

  ngOnInit(): void {
    this.obtenerVentas()
  }

  obtenerVentas(){
    this.suscripcion.add(
      this.apiiVenta.obtenerListadoVentas().subscribe({
        next: (item: any []) => {
          this.listadoVenta =  item
          
        },
        error: (e) => {
          Swal.fire("Error al obtener el listdo " + e.message)
        }  
      })
    )
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
      pdf.save('reporteVentas'); // Generated PDF   
    });
  }
}

}
