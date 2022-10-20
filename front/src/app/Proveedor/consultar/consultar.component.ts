import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { Proveedor } from '../../models/proveedor';
import { ProveedorServiceService } from '../../Services/proveedor-service.service';
import { Router } from '@angular/router';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ProveedorModificado} from "../../models/proveedor-modificado";
import { BuscarProveedorPipe } from 'src/app/pipes/buscar-proveedor.pipe';

@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
})
export class ConsultarComponentProveedor implements OnInit, OnDestroy {
  proveedor: Proveedor = {} as Proveedor;
  proveedorModificado: ProveedorModificado = {} as ProveedorModificado;
  listaProveedor: Proveedor[] = [];
  subscripcion = new Subscription();
  mostrarFormulario: boolean = false;
  valorBuscarProveedor = new FormControl('');
  valorBusqueda: string = "";

  //https://www.coordenadas-gps.com/
  //https://www.youtube.com/watch?v=fnC5lOaOc5I&list=LL&index=9
  titleGoogleMaps = 'Google Maps';

  positionGoogleMaps = {
    lat: -31.30625,
    lng: -64.24199,
  };

  labelGoogleMaps = {
    color: 'red',
    text: 'mi casa',
  };

  constructor(
    private proveedorService: ProveedorServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerProveedores();
    this.buscarProveedor();
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  obtenerProveedores() {
    this.subscripcion.add(
      this.proveedorService.obtenerTodos().subscribe({
        next: (proveedores: Proveedor[]) => {
          this.listaProveedor = proveedores ;
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

  editar(proveedor: Proveedor) {
    this.mostrarFormulario = true;
    this.proveedor = proveedor;
  }

  formularioModificarProveedor = new UntypedFormGroup({
    //http://estilow3b.com/ejemplos-comunes-de-expresiones-regulares-javascript/
    nombre: new UntypedFormControl('', [Validators.pattern(/^[a-zA-Z ]+$/)]),
    cuil: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8}$/),
    ]),
    telefono: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^\d{7}$/),
    ]),
    pais: new UntypedFormControl('', [Validators.required]),
    direccion: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]+$/),
    ]),
    codigo_postal: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^\d{4}$/),
    ]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    latitud: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^-?\d{2}(\.[0-9]{4,4})$/),
    ]),
    longitud: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^-?\d{2}(\.[0-9]{4,4})$/),
    ]),
  });

  guardar() {
    this.proveedorModificado.codigo_postal = this.proveedor.codigo_postal;
    this.proveedorModificado.direccion = this.proveedor.direccion;
    this.proveedorModificado.email =  this.proveedor.email;
    this.proveedorModificado.latitud =  this.proveedor.latitud;
    this.proveedorModificado.longitud = this.proveedor.longitud;
    this.proveedorModificado.pais = this.proveedor.pais;
    this.proveedorModificado.telefono = this.proveedor.telefono;
    this.proveedorModificado.nombre = this.proveedor.nombre;

    this.subscripcion.add(
      this.proveedorService.modificarProveedor(this.proveedorModificado, this.proveedor).subscribe({
        next: () => {
          alert('proveedor modificado');
        },
        error: () => {
          alert('error al modificar proveedor');
        },
      })
    );
  }

  volver() {
    this.router.navigateByUrl('home');
  }


  buscarProveedor(){
    this.subscripcion.add(
    this.valorBuscarProveedor.valueChanges
    .pipe(debounceTime(300))
     .subscribe({
      next: () => {
        console.log(this.valorBusqueda);
      },
      error: () => {
        alert("error al buscar proveedor")
      }
    }))
  }

  // https://www.youtube.com/watch?v=vZ91vDD7FGY
  // https://www.npmjs.com/package/ng2-search-filter
 
}
