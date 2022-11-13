import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import {  ProductoService} from "../../Services/producto.service";

export function codigoBarraValidador(api: ProductoService): AsyncValidatorFn{
    return (control: AbstractControl) => {
        return api.obtenerProducto().pipe(
            map(item => {
                const variable = item.find(x => x.codigo_barra == control.value);
                return variable ? {nombreExists: true} : null;
            })
        )
    }
}


// export function descripcionValidador(api: ProductoService): AsyncValidatorFn{
//     return (control: AbstractControl) => {
//         return api.obtenerProducto().pipe(
//             map(item => {
//                 const variable = item.find(x => x.descripcion.toLowerCase() == control.value.toLowerCase());
//                 return variable ? {nombreExists: true} : null;
//             })
//         )
//     }
// }

// https://www.youtube.com/watch?v=wX6iVLyy4M0