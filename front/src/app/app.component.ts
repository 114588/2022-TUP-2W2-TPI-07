import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {AuthService} from "../app/Services/auth.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'front';
  
  constructor(private apiAuth: AuthService){
    
  }

  
  ngOnInit(): void {
   
  }

  public userHasRole(role: string) : boolean {
    return this.apiAuth.userHasRole(role);
  }

}
