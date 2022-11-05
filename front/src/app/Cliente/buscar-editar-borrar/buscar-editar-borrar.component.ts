import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteModificado } from 'src/app/models/cliente-modificado';
import { ClienteService } from 'src/app/Services/cliente.service';

@Component({
  selector: 'app-buscar-editar-borrar',
  templateUrl: './buscar-editar-borrar.component.html',
  styleUrls: ['./buscar-editar-borrar.component.css']
})
export class BuscarEditarBorrarCliente implements OnInit, OnDestroy {
  
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
    this.subscripcion.add(
      this.apiCliente.buscarClientePorNombre(this.valorBuscado).subscribe({
        next: (item: Cliente[]) => {

          this.listaClienteBusqueda=[]; //limpio la lista asi no acumula
          this.listaClienteBusqueda = item;
          this.banderaListadoBusqueda=true;
          this.valorBuscado = ""
                
        },
        error: () => {
          alert ("error al obtener cliente por nombre")
        }
    }))
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
      alert("cliente eliminado");
      
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(["registrarCliente"]);
      }); 

    },
    error: (e) => {
      alert("error al eliminar cliente: " + e.message)
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

  console.log(this.clienteParaModificar)
  console.log(this.clienteSeleccionado)

  this.subscripcion.add(
    this.apiCliente.modificarCliente(this.clienteParaModificar, this.clienteSeleccionado).subscribe({
      next: () => {
        alert('cliente modificado');
        this.banderaFormularioEdicion=false;

      },
      error: (e) => {
        alert('error al modificar cliente' + e.message);
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
        alert ("error al obtener cliente por nombre " + e.message)
      }
  }))
}





  volver() {
    this.router.navigateByUrl('home');
  }



 
}

