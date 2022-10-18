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

  titleGoogleMaps = 'Google Maps';

  positionGoogleMaps = {
    lat: -31.30625,
    lng: -64.24199,
  };

  labelGoogleMaps = {
    color: 'red',
    text: 'mi casa',
  };

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

  borrar(proveedor: Proveedor) {
    this.subscripcion.add(
      this.proveedorService.eliminarProveedor(proveedor.cuil!).subscribe({
        next: () => {
          alert('proveedor borrado');
          this.obtenerProveedores();
        },
        error: () => {
          alert('error al borrar proveedor');
        },
      })
    );
  }
}
