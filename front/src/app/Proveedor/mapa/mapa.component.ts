import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit, OnChanges {

  @Input() latitud: number= 0
  @Input() longitud: number= 0  

//https://www.coordenadas-gps.com/
  //https://www.youtube.com/watch?v=fnC5lOaOc5I&list=LL&index=9

  position = {
    lat: this.latitud,
    lng: this.longitud 
  };

  label = {
    color: "red",
    text: 'mi casa',
  };
  constructor() { }
  
  ngOnChanges(changes: SimpleChanges): void {
      
    console.log("capturado desde el mapa: " + this.latitud)
    console.log("capturado desde el mapa: " + this.longitud)

  }

  ngOnInit(): void {
  }

  

}
