import { Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ReporteVentasService } from 'src/app/Services/reporte-ventas.service';
import * as moment from 'moment';
import {ChartData} from "chart.js";
import { Chart, registerables } from 'node_modules/chart.js'
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { RespuestaApiModel } from './respuesta-api-model';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';



@Component({
  selector: 'app-reporte-mas-vendidos',
  templateUrl: './reporte-mas-vendidos.component.html',
  styleUrls: ['./reporte-mas-vendidos.component.css']
})
export class ReporteMasVendidosComponent implements OnInit, OnDestroy {

  fecha1: string = "";
  fecha2: string = "";
  fechaConvertida1: string = ""
  fechaConvertida2: string = ""
  suscripcion= new Subscription()
  banderaMostrarFecha = true
  
  banderaMostrarGrafico:boolean = false;


  //para el pdf
  //https://www.youtube.com/watch?v=Eh6StPjcWjE
  @ViewChild("imprimir") myData!: ElementRef;


  constructor(private apiReporte: ReporteVentasService, private router: Router) {   }
 
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = ['rgba(255, 99, 132, 0.3)', 'rgba(55, 162, 235, 0.3)', 'rgba(255, 206, 86, 0.3)', 'rgba(75, 192, 192, 0.3)', 'rgba(154, 102, 255, 0.3)', "orange", "lightblue", "cian", "violet"];
  listaCompleta: any[] = []
  public p: number = 1


  listaCantidad: number [] =  [];
  listaDescripcion: string [] = []
  
  datos : ChartData<'bar'> ={
    labels: [],
    datasets: [
      {
        data: [],
        label:""
        
      } 
     ],

    }

  ngOnInit(): void {

  }


  // https://www.youtube.com/watch?v=R7FWzJ8bgnQ
  obtenerReporteVenta(){
    if( this.fecha1 == "" || this.fecha2 ==""){
      Swal.fire("Debe seleccionar todos los campos")
    } else {
      this.fechaConvertida1 =  moment(this.fecha1, "YYYY-MM-DD").format('DDMMYYYY')
      this.fechaConvertida2 =  moment(this.fecha2, "YYYY-MM-DD").format('DDMMYYYY')

      this.suscripcion.add(
        this.apiReporte.obtenerMasVendidos(this.fechaConvertida1, this.fechaConvertida2).subscribe({
          next: (item : RespuestaApiModel[]) => {
            if(item.length <1){
              Swal.fire("No existen datos")
            } else {
            
            this.listaCantidad= item.map(x => x.cantidad)
            this.listaDescripcion = item.map( x => x.descripcion)
            this.listaCompleta = item
            this.banderaMostrarGrafico = true
            this.cambiar(this.listaDescripcion,this.listaCantidad )

          }},
          error: (e) => {
            Swal.fire("Error al obtener listado " + e.message)
          }
        })  
      )};
  }


  cambiar(parametroLabel: string [], parametroData: number []){
    this.datos  ={
      labels: parametroLabel,
      datasets: [
        {
          data: parametroData,
          label: "cantidades"          
        } 
       ]}
  }
  
  descargarPdf(){
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
        pdf.save('reporteDos'); // Generated PDF   
    });
  }
}

}
