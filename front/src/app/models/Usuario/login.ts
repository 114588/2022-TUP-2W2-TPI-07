import { Rol } from "./rol";

export interface Login {
    legajo?: number,
    nombre?: string,
    rol?: Rol,
    pass?: string

}
