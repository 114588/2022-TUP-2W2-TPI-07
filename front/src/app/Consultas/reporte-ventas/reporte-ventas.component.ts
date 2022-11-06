import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/Ventas/factura';
import {ReporteVentasService} from "../../Services/reporte-ventas.service";
import * as moment from 'moment';
import {ChartData} from "chart.js";
//https://momentjs.com/
//https://es.stackoverflow.com/questions/403659/moment-js-problema-al-dar-formato-a-fechas



@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  fecha1: string = "";
  fecha2: string = "";

  datos: ChartData<'bar', number[], string > = {
    labels: ['12/04/2022', '12/05-2022', '12/06/2022'],
    datasets: [
      {data:[100, 130, 20],
       label:"Vendedor1"
      },
      {data:[80, 200, 80],
        label:"Vendedor2"
       }
    ]
  }

  sumaTotal: number = 0;

  constructor(private apiReporte: ReporteVentasService ) {   }

  ngOnInit(): void {
    
  }

 
  obtenerReporteVenta(){
    
    const fechaConvertida1 =  moment(this.fecha1, "YYYY-MM-DD").format('DDMMYYYY')
    const fechaConvertida2 =  moment(this.fecha2, "YYYY-MM-DD").format('DDMMYYYY')


    this. apiReporte.obtenerTodos(fechaConvertida1,fechaConvertida2).subscribe({
      next: (item: Factura[]) => {
        item.forEach(element=> {
           this.sumaTotal += element.monto_total
        });
        console.log(this.sumaTotal)


      },
      error: () => {}
    })
  }

}
