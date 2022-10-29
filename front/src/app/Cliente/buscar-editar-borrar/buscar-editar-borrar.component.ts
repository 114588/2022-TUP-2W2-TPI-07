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

  valorBusqueda: string = "";  
  listaCliente: Cliente[] = [];
  banderaFormularioEdicion: boolean =  false;
  clienteSeleccionado: Cliente = {} as Cliente;
  cliente: Cliente = {} as Cliente;
  clienteModificado: ClienteModificado = {} as ClienteModificado;


  valorBuscarCliente = new FormControl('');

  ClienteSeleccionado : Cliente = {} as Cliente;
 
  
  constructor(
    private apiCliente: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    

  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

// ====================== BUSCAR =================
  buscarClientePorNombre(){
    this.subscripcion.add(
      this.apiCliente.buscarClientePorNombre(this.valorBusqueda).subscribe({
        next: (item: Cliente) => {

          this.listaCliente=[]; //limpio la lista asi no acumula
          this.listaCliente.push(item);
          this.valorBusqueda = ""
                
        },
        error: () => {
          alert ("error al obtener cliente por nombre")
        }
    }))
  }

  // ================== LISTADO ====================

 elegirCliente(item: Cliente){
  this.banderaFormularioEdicion = true
  this.clienteSeleccionado = item

 }

 eliminar(item: Cliente){
  this.subscripcion.add(
  this.apiCliente.eliminarCliente(item.dni!).subscribe({
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
  this.clienteModificado.nombre = this.cliente.nombre;
  this.clienteModificado.telefono = this.cliente.telefono;
  this.clienteModificado.direccion =  this.cliente.direccion;
  this.clienteModificado.email =  this.cliente.email;
  this.clienteModificado.cantidad_puntos = this.cliente.cantidad_puntos;


  this.subscripcion.add(
    this.apiCliente.modificarCliente(this.clienteModificado, this.cliente).subscribe({
      next: () => {
        alert('cliente modificado');

      },
      error: () => {
        alert('error al modificar cliente');
      },
    })
  );
}







  obtenerListaclientes() {
    this.subscripcion.add(
      this.apiCliente.obtenerClientes().subscribe({
        next: (cliente: Cliente[]) => {
          this.listaCliente = cliente  ;
        },
        error: () => {
          alert('error al obtener listado');
        },
      })
    );
  }

  eliminarCliente(cliente: Cliente) {
    this.subscripcion.add(
      this.apiCliente.eliminarCliente(cliente.dni!).subscribe({
        next: () => {
          alert('cliente borrado');
          //this.obtenerListaclientees();
        },
        error: () => {
          alert('error al borrar cliente');
        },
      })
    );
  }

  editar(cliente: Cliente) {
    //this.mostrarFormulario = true;
    this.cliente = Object.assign({}, cliente);
  }

  formularioModificarcliente = new UntypedFormGroup({
    //http://estilow3b.com/ejemplos-comunes-de-expresiones-regulares-javascript/
    nombre: new UntypedFormControl('', [Validators.pattern(/^[a-zA-Z ]+$/)]),
    dni: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^\d{8}$/),
    ]),
    telefono: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^\d{7}$/),
    ]),
    
    direccion: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9 ]+$/),
    ]),
    cantPuntos: new UntypedFormControl('', [
      Validators.required,
      Validators.pattern(/^\d{7}$/),
    ]),
   
    correo: new UntypedFormControl('', [Validators.required, Validators.email]),
  
  });

 

  cancelar() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["buscarcliente"]);
    }); 
  }

  volver() {
    this.router.navigateByUrl('home');
  }



 
}

