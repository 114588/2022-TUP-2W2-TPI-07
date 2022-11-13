import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Proveedor } from '../models/proveedor';
import {ProveedorServiceService} from "../Services/proveedor-service.service"
import {ProductoService} from "../Services/producto.service"
import Swal from "sweetalert2"
import { Producto } from '../models/producto';
import { ItemsOrdenCompra } from '../models/items-orden-compra';
import {Router} from "@angular/router"
import { OrdenCompra } from '../models/OrdenCompra/orden-compra';
import {OrdenCompraService}  from "../Services/orden-compra.service"
import * as moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css']
})
export class OrdenCompraComponent implements OnInit, OnDestroy {

  suscripcion = new Subscription()

  listaProveedores: Proveedor[] = [];
  listaProductos: Producto[]= [];
  listaItems: ItemsOrdenCompra[] = []
  itemIndivual: ItemsOrdenCompra = {} as ItemsOrdenCompra
  productoIndividual:  Producto = {} as Producto
  proveedorIndividual: Proveedor = {} as Proveedor
  ordenCompra: OrdenCompra = {} as OrdenCompra
  monto_total: number = 0;
  banderaComprobante: boolean = false;
  banderaFormularioCarga: boolean = true;
  sumaFactura : number = 0;


  fechaOriginal = moment()
  fechaEmision =  moment(this.fechaOriginal, "YYYY-MM-DD").format('DD/MM/YYYY')

  fechaUltima = moment().add(30)
  fechaFin =  moment(this.fechaUltima, "YYYY-MM-DD").format('DD/MM/YYYY')


  formularioOrdenCompra = new UntypedFormGroup({
    proveedor: new FormControl("", Validators.required),
    fecha_emision: new FormControl("", Validators.required),
    fecha_fin:  new FormControl("", Validators.required),
    monto_total:  new FormControl("", Validators.required)
  })

  formularioItemsOrdenCompra =  new UntypedFormGroup({
    producto: new FormControl("", Validators.required),
    cantidad: new FormControl("", Validators.required)
  })


  //para el pdf
  //https://www.youtube.com/watch?v=Eh6StPjcWjE
  @ViewChild("imprimir") myData!: ElementRef;

  constructor(private apiProveedor: ProveedorServiceService, private apiProducto: ProductoService, private router: Router, private apiOrdenCompra:OrdenCompraService ) { }
  
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
    this.buscarProductos();
    this.buscarProveedor();
  }

  buscarProveedor(){
    this.apiProveedor.obtenerTodos().subscribe({
      next: (item: Proveedor[]) => {
        this.listaProveedores = item
      },
      error: (e) => {
        Swal.fire("Error al obtener proveedores; " + e.message)
      }
    })
  }

  buscarProductos(){
    this.suscripcion.add(
      this.apiProducto.obtenerProducto().subscribe({
        next: (item: Producto[]) => {
          this.listaProductos = item
        },
        error: (e) => {
          Swal.fire("Error al obtener productos; " + e.message)
        }
      })
    )
  }

  agregarItem(){
    
   // this.itemIndivual.producto = this.getProductoById(this.formularioItemsOrdenCompra.controls['producto'].value)!
   // this.itemIndivual.cantidad = this.formularioItemsOrdenCompra.controls['cantidad'].value

    this.listaItems.push({producto: this.getProductoById(this.formularioItemsOrdenCompra.controls['producto'].value)!, cantidad: this.formularioItemsOrdenCompra.controls['cantidad'].value }) 

    this.ordenCompra.proveedor =  this.getProveedorById(this.formularioOrdenCompra.controls['proveedor'].value)!;
    this.ordenCompra.items = this.listaItems;
    this.ordenCompra.fecha_emision = this.fechaEmision
    this.ordenCompra.fecha_fin  = this.fechaFin
    this.calcularMontoTotal()
    this.ordenCompra.monto_total = this.monto_total
    this.calcularMontoTotal()
  }


  eliminarItemIndividual(item: ItemsOrdenCompra){
    const index = this.listaItems.findIndex(x => x == item);
    this.listaItems.splice(index, 1)
    this.calcularMontoTotal()
  }


  guardar(){
   
    if(this.ordenCompra.items.length<1){
      Swal.fire("Debe cargar productos para guardar")
    } else {
      this.suscripcion.add(
        this.apiOrdenCompra.agregarOrdenCompra(this.ordenCompra).subscribe({
          next: () => {          
            this.banderaComprobante= true;
            this.banderaFormularioCarga= false;
            Swal.fire("Orden de Compra cargada con Éxito")
            
          },
          error: (e) => {
            Swal.fire("Error al grabar Orden de Compra " + e.message)
          }
        }))
    }

    // if(this.ordenCompra.items.length > 0){
    //   this.suscripcion.add(
    //   this.apiOrdenCompra.agregarOrdenCompra(this.ordenCompra).subscribe({
    //     next: () => {          
    //       this.banderaComprobante= true;
    //       alert("esperar")
    //       this.banderaFormularioCarga= false;
    //       Swal.fire("Orden de Compra cargada con Éxito")
          
    //     },
    //     error: (e) => {
    //       Swal.fire("Error al grabar Orden de Compra " + e.message)
    //     }
    //   }))
    // } else {
    //   Swal.fire("Debe cargar productos para guardar")
    // }
    //this.volver();
  }



  volver(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(["registrarOrdenCompra"]);
    });
  }


  getProductoById(id: number){
    return this.listaProductos.find(x => x.id == id)
  }

  getProveedorById(id: number){
    return this.listaProveedores.find(x => x.id == id)
  }

  calcularMontoTotal(){
    this.monto_total = 0;
    this.listaItems.forEach(item => {
      this.monto_total += item.cantidad * item.producto.precio_unitario_compra
    });
  }



  descargarPdf(){
    var data = document.getElementById('imprimir');
  if(data !== null) {
    html2canvas(data).then(canvas => {  
      // https://www.youtube.com/watch?v=Eh6StPjcWjE 
      let imgWidth = 180;   
      let imgHeight = canvas.height * imgWidth / canvas.width;  

      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  
      var margin = 5;
      let position = 5;  
      pdf.addImage(contentDataURL, 'PNG', margin, position, imgWidth, imgHeight)  
      pdf.save('ordenComprapdf'); // Generated PDF   
    });
  }
}


}
