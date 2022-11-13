import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import {ClienteService  } from "../../Services/cliente.service";

export function nombreValidador(api: ClienteService): AsyncValidatorFn{
    return (control: AbstractControl) => {
        return api.obtenerClientes().pipe(
            map(item => {
                const variable = item.find(x => x.dni == control.value);
                return variable ? {nombreExists: true} : null;
            })
        )
    }

}

// https://www.youtube.com/watch?v=wX6iVLyy4M0