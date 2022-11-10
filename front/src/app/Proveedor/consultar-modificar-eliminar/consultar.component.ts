import { Component, OnInit, OnDestroy } from '@angular/core';
import { debounceTime, Subscription } from 'rxjs';
import { Proveedor } from '../../models/proveedor';
import { ProveedorServiceService } from '../../Services/proveedor-service.service';
import { Router } from '@angular/router';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ProveedorModificado} from "../../models/proveedor-modificado";
import Swal from "sweetalert2"


@Component({
  selector: 'app-consultar',
  templateUrl: './consultar.component.html',
  styleUrls: ['./consultar.component.css'],
})
export class ConsultarComponentProveedor implements OnInit, OnDestroy {
  proveedor: Proveedor = {} as Proveedor;
  proveedorModificado: ProveedorModificado = {} as ProveedorModificado;
  listaProveedor: Proveedor[] = [];
  listaProveedorCompleta: Proveedor[] = [];
  listaProveedorBuscado: Proveedor[] = [];
  subscripcion = new Subscription();
  banderaFormularioEdicion: boolean = false;
  valorBuscarProveedor = new FormControl('');
  //valorBusqueda2: string = "";
  proveedorSeleccionado : Proveedor = {} as Proveedor;
  //banderaMostrarMapa: boolean = false;
  banderaMostrarListaCompleta : boolean =false
  banderaListadoBuscado: boolean = false;
  banderaListadoCompleto: boolean =  true;
  valorBusqueda =  new FormControl("")
  public p: number = 1
  


formularioModificarProveedor = new UntypedFormGroup({
  //http://estilow3b.com/ejemplos-comunes-de-expresiones-regulares-javascript/
  nombre: new UntypedFormControl('', [Validators.pattern(/^[a-zA-Z áéíóú]+$/)]),
  cuit: new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/^\d{11}$/),
  ]),
  telefono: new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/^\d{10}$/),
  ]),
  direccion: new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z0-9,áéíóú ]+$/),
  ]),
  codigo_postal: new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/^\d{4}$/),
  ]),
  email: new UntypedFormControl('', [Validators.required, Validators.email]),
});

  

  constructor(
    private proveedorService: ProveedorServiceService,
    private router: Router
  ) {}



  ngOnInit(): void {
    //this.obtenerListaProveedores();
   // this.buscarProveedorAutomaticamente();
   this.obtenerListaProveedoresCompleta()

  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

// =============== SECCION BUSCAR ===================
  buscarProveedorPorNombre(){
    // https://www.youtube.com/watch?v=vZ91vDD7FGY
   
   if(this.valorBusqueda.value == ""){
    this.obtenerListaProveedores(); //traigo toda la lsita
    this.banderaListadoBuscado=false;
    this.banderaListadoCompleto = true
   } else {
   
    this.subscripcion.add(
      this.proveedorService.buscarProveedorPorNombre(this.valorBusqueda.value!).subscribe({
        next: (item: Proveedor[]) => {
          if(item == null){
            Swal.fire("Proveedor no encontrado")
          } else {
            this.listaProveedor=[]; //limpio la lista asi no acumula
      
            this.listaProveedorBuscado = item; //asigno lo que viene de la ap
            this.banderaListadoCompleto = false //oculto el listado completo
            this.banderaListadoBuscado = true; //muestro listado busqueda
            //this.valorBusqueda.setValue("")
          }
          
        },
        error: (e) => {
          Swal.fire ("Error al obtener proveedor por nombre " + e.message )
        }
    }))
  }
}
  
  // ============ SECCION LISTADO BUSCADO================

  editar(item: Proveedor) {
    this.banderaListadoCompleto = false;
    this.banderaFormularioEdicion = true;
    this.proveedor = Object.assign({}, item);
  }


  borrar(item: Proveedor) {
    this.subscripcion.add(
      this.proveedorService.eliminarProveedor(item.id!).subscribe({
        next: () => {
          Swal.fire('Proveedor borrado');
          this.obtenerListaProveedores();
        },
        error: (e) => {
          Swal.fire('Error al borrar proveedor ' + e.message);
        },
      })
    );
  }


  obtenerListaProveedores() {
    this.subscripcion.add(
      this.proveedorService.obtenerTodos().subscribe({
        next: (proveedores: Proveedor[]) => {
          this.listaProveedor = proveedores  ;
        },
        error: (e) => {
          Swal.fire('Error al obtener listado ' + e);
        },
      })
    );
  }



// =============== SECCION FORMULARIO EDITAR ==================

  modificar() {
    this.proveedorModificado.codigo_postal = this.proveedor.codigo_postal;
    this.proveedorModificado.direccion = this.proveedor.direccion;
    this.proveedorModificado.email =  this.proveedor.email;
    this.proveedorModificado.telefono = this.proveedor.telefono;
    this.proveedorModificado.nombre = this.proveedor.nombre;
    this.proveedorModificado.cuit = this.proveedor.cuit;

    this.subscripcion.add(
      this.proveedorService.modificarProveedor(this.proveedorModificado, this.proveedor).subscribe({
        next: () => {

          Swal.fire('Proveedor modificado');
          this.banderaFormularioEdicion=false;  //oculto formulario edicion
          this.buscarProveedorPorNombre() //vuelvo a llamar a la api y con la busqueda

        },
        error: (e) => {
          console.log(e)
          Swal.fire('Error al modificar proveedor: ' + e.message);
        },
      })
    );
  }

  cancelar() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["buscarProveedor"]);
    }); 
  }


  // =============SECCION LISTADO COMPLETO ======================

  obtenerListaProveedoresCompleta() {
    this.subscripcion.add(
      this.proveedorService.obtenerTodos().subscribe({
        next: (proveedores: Proveedor[]) => {
          this.listaProveedorCompleta = proveedores  ;
        },
        error: (e) => {
          Swal.fire('Error al obtener listado ' + e);
        },
      })
    );
  }

  // mostrarListaCompleta(){
  //   this.banderaMostrarListaCompleta=true;
  // }




// ============= PAGINA PRINCIPAL =============

  volver() {
    this.router.navigateByUrl('home');
  }

  

 
}
