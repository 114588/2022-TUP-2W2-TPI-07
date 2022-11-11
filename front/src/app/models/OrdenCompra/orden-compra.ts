import { ItemsOrdenCompra } from "../items-orden-compra";
import { Proveedor } from "../proveedor";



export interface OrdenCompra {
    id: number,
    proveedor: Proveedor
    fecha_emision: string,
    fecha_fin: string,
    monto_total: number
    items: ItemsOrdenCompra[]
}
