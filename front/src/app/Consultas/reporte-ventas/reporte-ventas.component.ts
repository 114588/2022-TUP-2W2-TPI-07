import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Factura } from 'src/app/models/Ventas/factura';
import {ReporteVentasService} from "../../Services/reporte-ventas.service";
import * as moment from 'moment';
import {ChartData,  ChartType, ChartOptions} from "chart.js";
import { Chart, registerables } from 'node_modules/chart.js'
import {ClienteService} from  "../../Services/cliente.service"
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {RespuestaApiModelCliente} from "../reporte-ventas/respuesta-api-model"
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
  clienteSeleccionado : Cliente = {} as Cliente


  banderaMostrarGrafico:boolean = false;

  listaMonto: number [] =  [];
  listaFecha: string [] = []
  listaCompleta: RespuestaApiModelCliente[] = []
  
  
  //inicializo el objeto a graficar
  datos : ChartData<'pie'> ={
    labels: [],
    datasets: [
      {
        data: [],
        label:""
        
      } 
     ],
    }

   //para el pdf
  //https://www.youtube.com/watch?v=Eh6StPjcWjE
  @ViewChild("imprimir") myData!: ElementRef;



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

  // https://www.youtube.com/watch?v=R7FWzJ8bgnQ



  //aca lo estuvimos viendo con Juan.. para sacar el setTimeOut... Js es asincronico
  //por lo tanto siempre es conveniente a cada funcion asignarle  a una variable
  //y usar esta variable... con esto nos aseguramos que cuando se use la variable
  //va a tener datos cargados... porque puede darse el caso en que al grafico 
  //se le pase una funcion y si esta funcion demora (por ej llamada a la api)
  // el programa va a seguir su ejecucion y sin haber cargado el resultado de la api
  
  obtenerReporteVenta() {
    this.clienteSeleccionado = this.getNombreClienteById(this.cliente.value)!

    if (this.fecha1 == "" || this.fecha2 == "" || this.cliente.value == null) {
      Swal.fire("Debe seleccionar todos los campos")
    } else {

      this.fechaConvertida1 = moment(this.fecha1, "YYYY-MM-DD").format('DDMMYYYY')
      this.fechaConvertida2 = moment(this.fecha2, "YYYY-MM-DD").format('DDMMYYYY')
      // console.log("fecha 1 enviada: " + this.fechaConvertida1)
      // console.log("fecha 2 enviada: " + this.fechaConvertida2)

      this.apiReporte.obtenerPorFechaMontos(this.cliente.value, this.fechaConvertida1, this.fechaConvertida2).subscribe({
        next: (item: RespuestaApiModelCliente[]) => {
          if (item.length < 1) {
            Swal.fire("No existen datos")

          } else {
            this.listaMonto = item.map(x => x.monto)
            this.listaFecha = item.map(x => x.fecha)
            this.listaCompleta = item
            this.banderaMostrarGrafico = true
            this.cambiar(this.listaFecha, this.listaMonto);
          }
        },
        error: () => { }
      })
    };
  }


//creo una funcion para cambiar el objeto inicializado con lo que viene de la api
  cambiar(labels: string[], montos: number[]) {
    this.datos = {
      labels: labels,
      datasets: [
        {
          data: montos,
          label: "cantidades"
        }
      ]
    }
  }



obtenerClientes(){
  this.apiCliente.obtenerClientes().subscribe({
    next: (item: Cliente[]) => {
      this.listadoClientes =  item
    },
    error: (e) => {
      Swal.fire("Error al obtener datos " + e.message)
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

      var margin = 10;
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      let position = 5;  
      pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight)  
      pdf.save('reporteUno'); // Generated PDF   
  });
}
}

getNombreClienteById(id: number){
  return this.listadoClientes.find( x => x.id == id)
}

}
