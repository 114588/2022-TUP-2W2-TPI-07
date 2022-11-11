import { Component, OnInit } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { OrdenCompra } from 'src/app/models/OrdenCompra/orden-compra';
import { Proveedor } from 'src/app/models/proveedor';

@Component({
  selector: 'app-buscar-orden-compra',
  templateUrl: './buscar-orden-compra.component.html',
  styleUrls: ['./buscar-orden-compra.component.css']
})
export class BuscarOrdenCompraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


}
