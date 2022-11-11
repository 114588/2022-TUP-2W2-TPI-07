import { ThisReceiver } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Factura } from 'src/app/models/Ventas/factura';
import {ReporteVentasService} from "../../Services/reporte-ventas.service";
import * as moment from 'moment';
import {ChartData} from "chart.js";
import { Chart, registerables } from 'node_modules/chart.js'
import {ClienteService} from  "../../Services/cliente.service"
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
//https://momentjs.com/
//https://es.stackoverflow.com/questions/403659/moment-js-problema-al-dar-formato-a-fechas



@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit, OnDestroy {

  fecha1: string = "";
  fecha2: string = "";
  fechaConvertida1: string = ""
  fechaConvertida2: string = ""
  suscripcion= new Subscription()
  listadoClientes: Cliente [] = []
  cliente = new FormControl();
  public p: number = 1


  banderaMostrarGrafico:boolean = false;


    //para el pdf
  //https://www.youtube.com/watch?v=Eh6StPjcWjE
  @ViewChild("imprimir") myData!: ElementRef;



  // datos: ChartData<'bar', number[], string > = {
  //   labels: ['12/04/2022', '12/05-2022', '12/06/2022'],
  //   datasets: [
  //     {data:[100, 130, 20],
  //      label:"Vendedor1"
  //     },
  //     {data:[80, 200, 80],
  //       label:"Vendedor2"
  //      }
  //   ]
  // }

  // sumaTotal: number = 0;

  constructor(private apiReporte: ReporteVentasService, private apiCliente: ClienteService ) {   }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  chartdata: any;

  labeldata: any[] = [];
  realdata: any[] = [];
  colordata: any[] = ["yellow", "red", "green", "pink", "brown", "orange", "lightblue", "cian", "violet"];

  ngOnInit(): void {
    this.obtenerClientes();
  }

 
  obtenerReporteVenta(){

    this.banderaMostrarGrafico = true
      
    this.fechaConvertida1 =  moment(this.fecha1, "YYYY-MM-DD").format('DDMMYYYY')
    this.fechaConvertida2 =  moment(this.fecha2, "YYYY-MM-DD").format('DDMMYYYY')
    //console.log("fecha 1 enviada: " + this.fechaConvertida1)
    //console.log("fecha 2 enviada: " + this.fechaConvertida2)
    //console.log(this.cliente ) 


    this.apiReporte.obtenerPorFechaMontos(this.cliente.value, this.fechaConvertida1,this.fechaConvertida2 ).subscribe(result => {
      this.chartdata = result;
       console.log(this.chartdata)
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length ;i++){
          //console.log(this.chartdata[i]);
          this.labeldata.push(this.chartdata[i].fecha);
          this.realdata.push(this.chartdata[i].monto);
          this.colordata.push(this.chartdata[i].colorcode);
        }
      this.RenderChart(this.labeldata,this.realdata,this.colordata,'bar','barchart');
      this.RenderChart(this.labeldata,this.realdata,this.colordata,'pie','piechart');
      // this.RenderChart(this.labeldata,this.realdata,this.colordata,'doughnut','dochart');
      // this.RenderChart(this.labeldata,this.realdata,this.colordata,'polarArea','pochart');

      // this.RenderChart(this.labeldata,this.realdata,this.colordata,'radar','rochart');
    }

   // this.fecha1=""
   // this.fecha2=""
    //console.log(this.chartdata)
    //this.chartdata = []
    //this.labeldata= [];
   // this.realdata= [];
   //this.colordata= [];
  });
      // this.RenderBubblechart();
      // this.RenderScatterchart();
      


      // this. apiReporte.obtenerTodos(fechaConvertida1,fechaConvertida2).subscribe({
      //   next: (item: Factura[]) => {
      //     item.forEach(element=> {
      //        this.sumaTotal += element.monto_total
      //     });
      //     console.log(this.sumaTotal)


      //   },
      //   error: () => {}
      // })
    
  }

    RenderChart(labeldata:any,maindata:any,colordata:any,type:any,id:any) {
      const myChart = new Chart(id, {
        type: type,
        data: {
          labels: labeldata,
          datasets: [{
            //label: '# of Votes',
            data: maindata,
            backgroundColor: colordata,
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  }

  //  RenderBubblechart(){
  //   const data = {
  //     datasets: [{
  //       label: 'First Dataset',
  //       data: [{
  //         x: 20,
  //         y: 30,
  //         r: 15
  //       }, {
  //         x: 40,
  //         y: 10,
  //         r: 10
  //       }],
  //       backgroundColor: 'rgb(255, 99, 132)'
  //     }]
  //   };
  //   const myChart = new Chart('bubchart', {
  //     type: 'bubble',
  //     data: data,
  //     options: {
        
  //     }
  //   });
  // }

  // RenderScatterchart(){
  //   const data = {
  //     datasets: [{
  //       label: 'Scatter Dataset',
  //       data: [{
  //         x: -10,
  //         y: 0
  //       }, {
  //         x: 0,
  //         y: 10
  //       }, {
  //         x: 10,
  //         y: 5
  //       }, {
  //         x: 0.5,
  //         y: 5.5
  //       }],
  //       backgroundColor: 'rgb(255, 99, 132)'
  //     }],
  //   };
  //   const myChart = new Chart('scchart', {
  //     type: 'scatter',
  //     data: data,
  //     options: {
  //       scales: {
  //         x: {
  //           type: 'linear',
  //           position: 'bottom'
  //         }
  //       }
  //     }
  //   });
  // }

obtenerClientes(){
  this.apiCliente.obtenerClientes().subscribe({
    next: (item: Cliente[]) => {
      this.listadoClientes =  item
    },
    error: (e) => {
      Swal.fire("Error al obtener clientes " + e.message)
    }
  })
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
      pdf.save('reporteUno'); // Generated PDF   
  });
}
}

}
