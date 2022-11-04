import { Producto } from "./producto";

export interface Detalle {
    id: number,
    producto: Producto,
    importe: number,
    cantidad: number
}
