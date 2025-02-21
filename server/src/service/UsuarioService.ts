import {UsuarioRepository} from "../repository/UsuarioRespository.js";
import { Usuario } from "../models/Usuario.js";

export class UsuarioService {

    public static async createUser(user: Usuario){
        try{
            await UsuarioRepository.save(user);
        }catch(err){
            console.log(err);
            return "El usuario ya existe.";
        }
    }
}
