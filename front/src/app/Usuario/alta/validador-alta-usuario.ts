import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";
import { UsuarioService } from "../../Services/usuario.service";

export function nombreValidador(api: UsuarioService): AsyncValidatorFn{
    return (control: AbstractControl) => {
        return api.obtenerTodos().pipe(
            map(item => {
                const variable = item.find(x => x.nombre.toLowerCase() == control.value.toLowerCase());
                return variable ? {nombreExists: true} : null;
            })
        )
    }

}

// https://www.youtube.com/watch?v=wX6iVLyy4M0