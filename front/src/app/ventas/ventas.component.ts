import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from '../models/Ventas/cliente';
import { Detalle } from '../models/Ventas/detalle';
import { Factura } from '../models/Ventas/factura';
import { Producto } from '../models/Ventas/producto';
import { TipoProducto } from '../models/Ventas/tipo-producto';
import { VentaService } from '../Services/venta.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  
  fecha = new Date()
  nuevaFactura: Factura = {} as Factura;
  nuevoDetalle: Detalle = {} as Detalle;

  suscripcion = new Subscription();
  sumaFactura : number = 0;

  //VIENE DE LA API
  listadoCliente: Cliente []= []  // VIENE DE LA API: id, dni, nombre_apellido, telefono, direccion, email
  listadoProductos: Producto []= [] // VIENE DE LA API: id, codigo, descrrpcion, tipoProducto{}, precio_unitario_venta, precio_unitario_compra

  //PARA CAPTURAR DATOS EN EL FRONT
  clienteSeleccionado: Cliente = {} as Cliente;
  detalleSeleccionado: Detalle =  {} as Detalle // id, producto[], cantidad, importe
  productoSeleccionado : Producto = {id:1, codigo: 0, descripcion: "", tipoProducto: {id: 1, tipo: ""}, precio_unitario_venta:0, precio_unitario_compra:0} //id, codigo, descripcion, tipoProducto {}, precio_unitario_venta, precio_unitario_compra 
  tipoSeleccionado: TipoProducto= {id: 0, tipo: ""} //id, tipo
  arrayDetalleSeleccionado: Detalle[] = [];


  idCliente: number = 0;



  constructor(private apiVenta: VentaService) { }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.buscarProducto();
    this.buscarCliente();
  }


  buscarProducto(){
    // https://www.youtube.com/watch?v=vZ91vDD7FGY
    this.suscripcion.add(
      this.apiVenta.obtenerTodosProductos().subscribe({
        next: (item: Producto[]) => {
          console.log(item)
         // Object.assign((this.listadoProductos),item );
            this.listadoProductos = item          
        },
        error: () => {
          alert ("error al obtener proveedor por nombre")
        }
    }))
  }


  buscarCliente(){
    this.suscripcion.add(
    this.apiVenta.obtenerClientes().subscribe({
      next: (item : Cliente[]) => {
       this.listadoCliente = item
  
      },
      error: (e) => {
        alert("error al eliminar cliente: " + e.message)
      }
  
    }))
   }
  

   agregarDetalles(){
    //   this.itemEnviar = Object.assign({}, this.itemEnviar)
    //   this.conceptos.push(Object.assign({}, this.itemEnviar));
    //  

    console.log(this.productoSeleccionado)
    console.log(this.getProductoById(this.productoSeleccionado.codigo))
    console.log(this.getClienteById(this.nuevaFactura.id))

    if(this.nuevaFactura.items == null || this.nuevaFactura.items == undefined){
      this.nuevaFactura.items = new Array<Detalle>();
    }
    

    //EMPIEZO A CONSTRUIR LA  FACTURA A PASAR
    this.nuevaFactura.items.push( {producto: this.getProductoById(this.productoSeleccionado.codigo), cantidad:this.nuevoDetalle.cantidad, importe: this.nuevoDetalle.importe } as Detalle )
    
    this.sumarItems();
    
    // this.nuevaFactura.id=3
    this.nuevaFactura.cliente = this.getClienteById(this.clienteSeleccionado.id!)
    this.nuevaFactura.fecha= this.fecha.toString()
    this.nuevaFactura.monto_total = this.sumaFactura
    // console.log(this.nuevaFactura)
 
   }


   sumarItems(){
    this.sumaFactura = 0;
    this.nuevaFactura.items.forEach(item => {
    this.sumaFactura = this.sumaFactura + (item.cantidad * item.importe)
   });
   }


   getProductoById(item: number): Producto{
    return this.listadoProductos.find(x => x.codigo == item) ?? {} as Producto;
   }

   getClienteById(item: number){
    return this.listadoCliente.find(x => x.id == item) ?? {} as Cliente;
   }

   guardarVenta(){
    console.log(this.nuevaFactura)
    this.apiVenta.guardarFactura(this.nuevaFactura).subscribe({
      next: () => {
        alert("factura cargada")
      },
      error: (e) => {
        alert("error al cargar la factura " + e.message )
      }
    })
   }

}
