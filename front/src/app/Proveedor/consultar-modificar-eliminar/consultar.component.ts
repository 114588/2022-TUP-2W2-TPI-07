import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { Proveedor } from '../../models/proveedor';
import { ProveedorServiceService } from '../../Services/proveedor-service.service';
import { Router } from '@angular/router';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ProveedorModificado} from "../../models/proveedor-modificado";

interface posicion {
  lat: number,
  lng: number
}



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
  proveedorSeleccionado : Proveedor = {} as Proveedor;
  banderaMostrarMapa: boolean = false;
  
  miLatitud!: number 
  miLongitud!: number 

  posicionProveedorPadre: posicion = {
    lat: this.miLatitud,
    lng: this.miLongitud, 
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

  

  constructor(
    private proveedorService: ProveedorServiceService,
    private router: Router
  ) {}



  ngOnInit(): void {
    //this.obtenerListaProveedores();
   // this.buscarProveedorAutomaticamente();

  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }




  obtenerListaProveedores() {
    this.subscripcion.add(
      this.proveedorService.obtenerTodos().subscribe({
        next: (proveedores: Proveedor[]) => {
          this.listaProveedor = proveedores  ;
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
          this.obtenerListaProveedores();
        },
        error: () => {
          alert('error al borrar proveedor');
        },
      })
    );
  }

  editar(proveedor: Proveedor) {
    this.mostrarFormulario = true;
    this.proveedor = Object.assign({}, proveedor);
  }



  modificar() {
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
        error: (e) => {
          console.log(e)
          alert('error al modificar proveedor: ' + e);
        },
      })
    );
  }

  cancelar() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["buscarProveedor"]);
    }); 
  }

  volver() {
    this.router.navigateByUrl('home');
  }


  //buscarProveedorAutomaticamente(){
    //esto es con libreria ng2Search
      // https://www.youtube.com/watch?v=vZ91vDD7FGY
    // https://www.npmjs.com/package/ng2-search-filter

  //   this.subscripcion.add(
  //   this.valorBuscarProveedor.valueChanges
  //   .pipe(debounceTime(300))
  //    .subscribe({
  //     next: () => {
  //       console.log(this.valorBusqueda);
  //     },
  //     error: () => {
  //       alert("error al buscar proveedor automaticamente")
  //     }
  //   }))
  // }

  buscarProveedorPorNombre(){
    // https://www.youtube.com/watch?v=vZ91vDD7FGY
    this.subscripcion.add(
      this.proveedorService.buscarProveedorPorNombre(this.valorBusqueda).subscribe({
        next: (proveedor: Proveedor) => {
          
          this.listaProveedor=[]; //limpio la lista asi no acumula
          
          //this.latitud = proveedor.latitud!;
          //this.latitud = proveedor.latitud!;
          //this.miLatitud!= this.listaProveedor[0].latitud;
          //this.miLongitud!= this.listaProveedor[0].longitud;

          console.log("capturado desde el consultar " + proveedor.latitud);
          console.log("capturado desde el consultar " + proveedor.longitud);

          this.miLatitud!=proveedor.latitud;
          this.miLongitud!=proveedor.longitud;

          this.listaProveedor.push(proveedor);

          this.banderaMostrarMapa= true;

          
        },
        error: () => {
          alert ("error al obtener proveedor por nombre")
        }
    }))
  }


 
}
