import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import {ProveedorServiceService  } from "../../Services/proveedor-service.service";

export function nombreValidador(api: ProveedorServiceService): AsyncValidatorFn{
    return (control: AbstractControl) => {
        return api.obtenerTodos().pipe(
            map(item => {
                const variable = item.find(x => x.cuit == control.value);
                return variable ? {nombreExists: true} : null;
            })
        )
    }

}

// https://www.youtube.com/watch?v=wX6iVLyy4M0