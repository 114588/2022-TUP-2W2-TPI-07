import { Rol } from "./rol";

export interface Usuario {
    legajo?: number,
    nombre: string,
    rol: Rol,
    password: string,
    repeticionClave?: string
}
