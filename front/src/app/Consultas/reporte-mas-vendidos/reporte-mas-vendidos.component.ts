import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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



@Component({
  selector: 'app-reporte-mas-vendidos',
  templateUrl: './reporte-mas-vendidos.component.html',
  styleUrls: ['./reporte-mas-vendidos.component.css']
})
export class ReporteMasVendidosComponent implements OnInit {

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

  // obtenerReporteVenta(){
  //   if( this.fecha1 == "" || this.fecha2 ==""){
  //     Swal.fire("Debe seleccionar todos los campos")
  //   } else {

  //     this.banderaMostrarGrafico = true
        
  //     this.fechaConvertida1 =  moment(this.fecha1, "YYYY-MM-DD").format('DDMMYYYY')
  //     this.fechaConvertida2 =  moment(this.fecha2, "YYYY-MM-DD").format('DDMMYYYY')
  //     console.log("fecha 1 enviada: " + this.fechaConvertida1)
  //     console.log("fecha 2 enviada: " + this.fechaConvertida2)

  //     this.apiReporte.obtenerMasVendidos(this.fechaConvertida1,this.fechaConvertida2 ).subscribe(result => {
  //       this.chartdata = result;
  //       this.listaCompleta = result;
  //       console.log("array devuelto " + JSON.stringify(result))
  //       if(this.chartdata!=null){
  //         for(let i=0; i<this.chartdata.length ;i++){
  //           //console.log(this.chartdata[i]);
  //           this.labeldata.push(this.chartdata[i].descripcion);
  //           this.realdata.push(this.chartdata[i].cantidad);
  //           this.colordata.push(this.chartdata[i].colorcode);
  //         }
  //       this.RenderChart(this.labeldata,this.realdata,this.colordata,'bar','barchart');
  //     }

  //     this.banderaMostrarFecha= false;

  //     this.fecha1=""
  //     this.fecha2=""
  //     console.log(this.chartdata)
  //     this.chartdata = []
  //     this.labeldata= [];
  //     this.realdata= [];
  //     this.colordata= [];
  //   });
  //   }

  // }
  

  //   RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
    
  //   const myChart = new Chart(id, {
  //       type: type,
  //       data: {
  //         labels: labeldata,
  //         datasets: [{
  //           label: 'Mas Vendido',
  //           data: maindata,
  //           backgroundColor: colordata,
  //           borderColor: [
  //             'rgba(255, 99, 132, 0.3)'
  //           ],
  //           borderWidth: 1
  //         }]
  //       },
  //       options: {
  //         scales: {
  //           y: {
  //             beginAtZero: true
  //           }
  //         }
  //       }
  //     });
  // }



  // https://www.youtube.com/watch?v=R7FWzJ8bgnQ
  obtenerReporteVenta(){
    if( this.fecha1 == "" || this.fecha2 ==""){
      Swal.fire("Debe seleccionar todos los campos")
    } else {

      
        
      this.fechaConvertida1 =  moment(this.fecha1, "YYYY-MM-DD").format('DDMMYYYY')
      this.fechaConvertida2 =  moment(this.fecha2, "YYYY-MM-DD").format('DDMMYYYY')
      // console.log("fecha 1 enviada: " + this.fechaConvertida1)
      // console.log("fecha 2 enviada: " + this.fechaConvertida2)

      this.apiReporte.obtenerMasVendidos(this.fechaConvertida1, this.fechaConvertida2).subscribe({
        next: (item : RespuestaApiModel[]) => {
          if(item.length <1){
            Swal.fire("No existen datos")
          } else {
           
           this.listaCantidad= item.map(x => x.cantidad)
           this.listaDescripcion = item.map( x => x.descripcion)
           this.listaCompleta = item
           this.banderaMostrarGrafico = true
          //  console.log(item)

        }},
        error: () => {}
      })  
    };
    setTimeout(() => {this.cambiar();}, 500)
    

  }


  cambiar(){
    this.datos  ={
      labels: this.listaDescripcion,
      datasets: [
        {
          data: this.listaCantidad,
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
