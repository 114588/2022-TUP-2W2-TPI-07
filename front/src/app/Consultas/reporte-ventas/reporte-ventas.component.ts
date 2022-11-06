import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/Ventas/factura';
import {ReporteVentasService} from "../../Services/reporte-ventas.service";
import * as moment from 'moment';

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  fecha1: string = "";
  fecha2: string = "";

  constructor(private apiReporte: ReporteVentasService ) {   }

  ngOnInit(): void {
    
  }

 
  obtenerReporteVenta(){
    
    const fechaConvertida1 =  moment(this.fecha1, "YYYY-MM-DD").format('DDMMYYYY')
    const fechaConvertida2 =  moment(this.fecha2, "YYYY-MM-DD").format('DDMMYYYY')
    this. apiReporte.obtenerTodos(fechaConvertida1,fechaConvertida2).subscribe({
      next: (item: Factura[]) => {
        console.log(item)
      },
      error: () => {}
    })
  }

}
