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
  cliente: Cliente = {} as Cliente;
  clienteModificado: ClienteModificado = {} as ClienteModificado;
  listaCliente: Cliente[] = [];
  subscripcion = new Subscription();
  mostrarFormulario: boolean = false;
  valorBuscarCliente = new FormControl('');
  valorBusqueda: string = "";
  ClienteSeleccionado : Cliente = {} as Cliente;
 
  
  

  

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    

  }

  ngOnDestroy(): void {
    this.subscripcion.unsubscribe();
  }

  obtenerListaclientees() {
    this.subscripcion.add(
      this.clienteService.obtenerClientes().subscribe({
        next: (cliente: Cliente[]) => {
          this.listaCliente = cliente  ;
        },
        error: () => {
          alert('error al obtener listado');
        },
      })
    );
  }

  borrar(cliente: Cliente) {
    this.subscripcion.add(
      this.clienteService.eliminarCliente(cliente.dni!).subscribe({
        next: () => {
          alert('cliente borrado');
          this.obtenerListaclientees();
        },
        error: () => {
          alert('error al borrar cliente');
        },
      })
    );
  }

  editar(cliente: Cliente) {
    this.mostrarFormulario = true;
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

  guardar() {
    this.clienteModificado.nombre = this.cliente.nombre;
    this.clienteModificado.telefono = this.cliente.telefono;
    this.clienteModificado.direccion =  this.cliente.direccion;
    this.clienteModificado.correo =  this.cliente.correo;
    this.clienteModificado.cantPuntos = this.cliente.cantPuntos;
 

    this.subscripcion.add(
      this.clienteService.modificarCliente(this.clienteModificado, this.cliente).subscribe({
        next: () => {
          alert('cliente modificado');

        },
        error: () => {
          alert('error al modificar cliente');
        },
      })
    );
  }

  cancelar() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["buscarcliente"]);
    }); 
  }

  volver() {
    this.router.navigateByUrl('home');
  }


  
  buscarclientePorNombre(){
    this.subscripcion.add(
      this.clienteService.buscarClientePorNombre(this.valorBusqueda).subscribe({
        next: (cliente: Cliente) => {
          
          this.listaCliente=[]; //limpio la lista asi no acumula
       

          
        },
        error: () => {
          alert ("error al obtener cliente por nombre")
        }
    }))
  }


 
}

