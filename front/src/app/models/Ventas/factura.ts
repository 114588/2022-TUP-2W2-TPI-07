import { Cliente } from "../cliente";
import { Detalle } from "./detalle";

export interface Factura {
    id: number,
    cliente: Cliente,
    items: Detalle[],
    fecha: string,
    monto_total: number
}
