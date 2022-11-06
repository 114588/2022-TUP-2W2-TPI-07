import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/models/Ventas/factura';
import {ReporteVentasService} from "../../Services/reporte-ventas.service"

@Component({
  selector: 'app-reporte-ventas',
  templateUrl: './reporte-ventas.component.html',
  styleUrls: ['./reporte-ventas.component.css']
})
export class ReporteVentasComponent implements OnInit {

  fecha1: string= "20082022"; 
  fecha2: string = "23082022"; 
  listadoReporte: Factura[] = [];

  constructor(private apiReporte: ReporteVentasService ) { }

  ngOnInit(): void {
    console.log(this.fecha1)
    console.log(this.fecha2)
    this.obtenerReporteVenta()
  }

  obtenerReporteVenta(){
    this. apiReporte.obtenerTodos(this.fecha1,this.fecha2).subscribe({
      next: (item: Factura[]) => {
        console.log(item)
      },
      error: () => {}
    })
  }

}
