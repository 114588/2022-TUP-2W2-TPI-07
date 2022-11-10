import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Subscription } from 'rxjs';
import { Cliente } from '../models/Ventas/cliente';
import { Detalle } from '../models/Ventas/detalle';
import { Factura } from '../models/Ventas/factura';
import { Producto } from '../models/Ventas/producto';
import { TipoProducto } from '../models/Ventas/tipo-producto';
import { VentaService } from '../Services/venta.service';
import * as moment from 'moment';
import {Router} from "@angular/router"
import Swal from "sweetalert2"
import { ThemeService } from 'ng2-charts';


@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  
  //para el pdf
  //https://www.youtube.com/watch?v=Eh6StPjcWjE
  @ViewChild("factura") myData!: ElementRef;

// mes/dia/año
  fechaOriginal = new Date("11/01/2022")
  fecha =  moment(this.fechaOriginal, "YYYY-MM-DD").format('DD/MM/YYYY')
  nuevaFactura: Factura = {} as Factura;
  nuevoDetalle: Detalle = {} as Detalle;
  banderaMostrarFactura: boolean = false;
  banderaMostrarFormularioCarga : boolean = true;

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




  constructor(private apiProveedor: VentaService, private router: Router) { }
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
      this.apiProveedor.obtenerTodosProductos().subscribe({
        next: (item: Producto[]) => {
          console.log(item)
         // Object.assign((this.listadoProductos),item );
            this.listadoProductos = item          
        },
        error: (e) => {
          Swal.fire ("Error al obtener proveedor por nombre " + e)
        }
    }))
  }


  buscarCliente(){
    this.suscripcion.add(
    this.apiProveedor.obtenerClientes().subscribe({
      next: (item : Cliente[]) => {
       this.listadoCliente = item
  
      },
      error: (e) => {
        Swal.fire("Error al eliminar cliente: " + e.message)
      }
  
    }))
   }
  

   agregarDetalles(){
    //   this.itemEnviar = Object.assign({}, this.itemEnviar)
    //   this.conceptos.push(Object.assign({}, this.itemEnviar));
    //  

    this.clienteSeleccionado = this.getClienteById(this.clienteSeleccionado.id!)
    console.log(this.productoSeleccionado)
    console.log(this.getProductoById(this.productoSeleccionado.codigo))
    console.log(this.getClienteById(this.nuevaFactura.id))

    if(this.nuevaFactura.items == null || this.nuevaFactura.items == undefined){
      this.nuevaFactura.items = new Array<Detalle>();
    }
    

    //EMPIEZO A CONSTRUIR LA  FACTURA A PASAR
    this.nuevaFactura.items.push( {producto: this.getProductoById(this.productoSeleccionado.codigo), cantidad:this.nuevoDetalle.cantidad, importe: this.nuevoDetalle.importe } as Detalle )
    
    // this.nuevaFactura.id=3
    this.nuevaFactura.cliente = this.getClienteById(this.clienteSeleccionado.id!)
    this.nuevaFactura.fecha= this.fecha.toString()
    this.sumarItems();
    this.nuevaFactura.monto_total = this.sumaFactura
    //this.nuevoDetalle.cantidad = 0
    this.sumarItems();
 
   }

   eliminarDetalle(item: Detalle){
   
    //obtengo el indice del objeto que quiero eliminar
    const indice = this.nuevaFactura.items.findIndex(x => x == item)
    console.log(indice);

    //con splice le digo que desde el indice obtenido borro 1 elemento
    this.nuevaFactura.items.splice(indice,1);

    
  }

   sumarItems(){
    this.sumaFactura = 0;
    this.nuevaFactura.items.forEach(item => {
    this.sumaFactura = this.sumaFactura + (item.cantidad * item.producto.precio_unitario_venta!)
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
    this.apiProveedor.guardarFactura(this.nuevaFactura).subscribe({
      next: () => {
        this.banderaMostrarFormularioCarga=false
        this.banderaMostrarFactura = true;
        Swal.fire("Factura cargada")
      },
      error: (e) => {
        Swal.fire("error al cargar la factura " + e.message )
      }
    })
   }


    descargarPdf(){
      var data = document.getElementById('factura');
    if(data !== null) {
      html2canvas(data).then(canvas => {  
        // https://www.youtube.com/watch?v=Eh6StPjcWjE 
        let imgWidth = 208;   
        let imgHeight = canvas.height * imgWidth / canvas.width;  
  
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
        let position = 5;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('facturapdf'); // Generated PDF   
      });
    }
  }

  volver(){
    this.router.navigateByUrl('home');
  }




}
