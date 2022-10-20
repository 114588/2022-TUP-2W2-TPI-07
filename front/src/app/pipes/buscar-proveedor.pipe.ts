import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarProveedor'
})
export class BuscarProveedorPipe implements PipeTransform {
//          lo que entra, lo que se busca   lo que devuelve
  transform(lista: any[], texto: string): any {
    if(!texto) return lista;
    return lista.filter(proveedor => proveedor.nombre.toLowerCase().includes(texto.toLowerCase()))  
  }

}
