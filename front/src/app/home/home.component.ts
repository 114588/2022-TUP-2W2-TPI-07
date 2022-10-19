import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  arrayLista: String []= ["Pineda, Kevin - Legajo 109833", "Cabrera, Guillermo - Legajo 109884", "Miguez, Pablo - Legajo 108537", "Zamuz, Ismael - Legajo 111942", "Ivetta, Luis - Legajo 114588"]


  constructor() { }

  ngOnInit(): void {
  }

}
