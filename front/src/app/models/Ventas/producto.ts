import { TipoProducto } from "./tipo-producto";

export interface Producto {
    id?: number,
    codigo: number,
    descripcion: string,
    tipoProducto?: TipoProducto,
    precio_unitario_venta?: number,
    precio_unitario_compra?: number
}
