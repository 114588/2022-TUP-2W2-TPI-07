import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';
import { ClienteModificado } from '../models/cliente-modificado';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }


 
  obtenerClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>("http://localhost:8081/clientes/listado/")
  }

  agregarCliente(nuevoCliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>("http://localhost:8081/clientes/alta/",nuevoCliente)
  }

  eliminarCliente(dni:number): Observable<any>{
    return this.http.delete("http://localhost:8081/clientes/eliminar/"+dni)
  }
   /// EL NEGRO ESTO LO HIZO CON CLIENTE, HAY QUE DECIRLE QUE CAMBIE A "CLIENTES"
  modificarCliente( ClienteModificado: ClienteModificado, ClienteViejo: Cliente): Observable<any>{
    return this.http.put("http://localhost:8081/cliente/actualizar/"+ ClienteViejo.dni, ClienteModificado)
    
  }

  buscarClientePorNombre(nombre: string): Observable<any>{
    return this.http.get("http://localhost:8081/clientes/buscarNombre/"+ nombre)
  }

}
