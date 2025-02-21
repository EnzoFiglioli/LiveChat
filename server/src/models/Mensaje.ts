import { Usuario } from "./Usuario";

interface Mensaje {
    id?: number,
    from : string,
    to: string,
    message : string,
    fecha? : Date,
    leido: boolean
}

export default Mensaje;