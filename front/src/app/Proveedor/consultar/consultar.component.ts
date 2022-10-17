import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Proveedor } from '../../models/proveedor';
import { ProveedorServiceService } from '../../Services/proveedor-service.service';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
})
export class ConsultarComponentProveedor implements OnInit, OnDestroy {
  proveedor: Proveedor = {} as Proveedor;
  listaProveedor: Proveedor[] = [];
  subscripcion = new Subscription();

  constructor(private proveedorService: ProveedorServiceService) {}

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }



  obtenerProveedores() {
    this.subscripcion.add(
      this.proveedorService.obtenerTodos().subscribe({
        next: (proveedores: Proveedor[]) => {
          this.listaProveedor = proveedores;
        },
        error: () => {
          alert('error al obtener listado');
        },
      })
    );
  }


  titleGoogleMaps = 'Google Maps';

  positionGoogleMaps = {
    lat: -31.306250,
    lng: -64.241990
  }

  labelGoogleMaps ={
    color: "red",
    text: "mi casa"
  }



}
