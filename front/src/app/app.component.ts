import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {AuthService} from "../app/Services/auth.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnChanges {
  
  title = 'front';

  isAdministrador: boolean = false
  
  constructor(private apiAuth: AuthService){
    
  }

  
  ngOnChanges(changes: SimpleChanges): void {
    this.apiAuth.checkAdministrador().subscribe({
      next: (item: any) => {
        console.log(item)
      },
      error: () => {}
    })
  }
  
  ngOnInit(): void {
    this.apiAuth.checkAdministrador().subscribe({
      next: (item: any) => {
        console.log(item)
      },
      error: () => {}
    })
  }



}
