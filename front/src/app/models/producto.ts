import { TipoProducto } from "./tipo-producto";

export interface Producto {
    id: number,
    codigo: number,
    descripcion: number,
    // id_tipo: number,
    precio_unitario_venta: number,
    precio_unitario_compra: number,
    tipoProducto: TipoProducto
}
