import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteModificado } from 'src/app/models/cliente-modificado';
import { ClienteService } from 'src/app/Services/cliente.service';
import Swal from "sweetalert2"


@Component({
  selector: 'app-buscar-editar-borrar',
  templateUrl: './buscar-editar-borrar.component.html',
  styleUrls: ['./buscar-editar-borrar.component.css']
})
export class BuscarEditarBorrarCliente implements OnInit, OnDestroy {
  
  public p: number = 1

  subscripcion = new Subscription();

  valorBuscado: string = "";  
  listaClienteBusqueda: Cliente[] = [];
  listaClienteCompleta: Cliente[] = [];
  banderaFormularioEdicion: boolean =  false;
  banderaListadoBusqueda: boolean = false
  clienteSeleccionado: Cliente = {} as Cliente;
  cliente: Cliente = {} as Cliente;
  clienteParaModificar: ClienteModificado = {} as ClienteModificado;
  banderaListadoCompleto: boolean = true
  
  valorBuscarCliente = new FormControl('');

  ClienteSeleccionado : Cliente = {} as Cliente;
 
  
  constructor(
    private apiCliente: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarTodosClientes()
  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

// ====================== BUSCAR =================
  buscarClientePorNombre(){
    if(this.valorBuscado == ""){

      this.buscarTodosClientes()
      this.banderaListadoBusqueda=false
      this.banderaListadoCompleto=true

    } else {
        this.subscripcion.add(
          this.apiCliente.buscarClientePorNombre(this.valorBuscado).subscribe({
            next: (item: Cliente[]) => {

              this.listaClienteBusqueda=[]; //limpio la lista asi no acumula
              this.listaClienteBusqueda = item;  //asigno lo que viene de la api
              this.banderaListadoCompleto=false; //oculto el listado completo
              this.banderaListadoBusqueda=true; //muestro listado de la busqueda
              //this.valorBuscado = ""
                    
            },
            error: () => {
              Swal.fire('Error al obtener cliente por nombre')
            }
        }))
    }
  }

  // ================== LISTADO  BUSQUEDA ====================

  editarCliente(item: Cliente){
  this.banderaFormularioEdicion = true;
  this.banderaListadoCompleto =  false;
  this.clienteSeleccionado = Object.assign({}, item)

 }

 eliminarCliente(item: Cliente){
  this.subscripcion.add(
  this.apiCliente.eliminarCliente(item.id!).subscribe({
    next: () => {
      Swal.fire('Cliente eliminado')
      
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["registrarCliente"]);
      }); 

    },
    error: (e) => {
      Swal.fire('Error al eliminar cliente:' + e.message)
    }

  }))
 }


//  =========== FORMULARIO EDICION ================

modificarDesdeFormulario() {
  this.clienteParaModificar.dni = this.clienteSeleccionado.dni;
  this.clienteParaModificar.nombre_apellido = this.clienteSeleccionado.nombre_apellido;
  this.clienteParaModificar.telefono = this.clienteSeleccionado.telefono;
  this.clienteParaModificar.direccion =  this.clienteSeleccionado.direccion;
  this.clienteParaModificar.email =  this.clienteSeleccionado.email;
  //this.clienteModificado.cantidad_puntos = this.clienteSeleccionado.cantidad_puntos;

  // console.log(this.clienteParaModificar)
  // console.log(this.clienteSeleccionado)

  this.subscripcion.add(
    this.apiCliente.modificarCliente(this.clienteParaModificar, this.clienteSeleccionado).subscribe({
      next: () => {
        Swal.fire('Cliente modificado')
        this.banderaFormularioEdicion=false;  //oculto formulario edicion
        this.buscarClientePorNombre() //vuelvo a llamar a la api y traigo todo

      },
      error: (e) => {
        Swal.fire('error al modificar cliente' + e.message)
      },
    })
  );
}

// ====================== LISTA COMPLETA CLIENTES =================
buscarTodosClientes(){
  this.subscripcion.add(
    this.apiCliente.obtenerClientes().subscribe({
      next: (item: Cliente[]) => {

        this.listaClienteCompleta = item;
              
      },
      error: (e) => {
        Swal.fire("error al obtener cliente por nombre " + e.message)
      }
  }))
}





  volver() {
    this.router.navigateByUrl('home');
  }



 
}

