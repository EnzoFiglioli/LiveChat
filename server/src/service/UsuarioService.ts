import {UsuarioRepository} from "../repository/UsuarioRespository";
import { Usuario } from "../models/Usuario.js";

export class UsuarioService {

    public static async createUser(user: Usuario){
        try{
            await UsuarioRepository.save(user);
            return "Usuario creado exitosamente!"
        }catch(err){
            console.log(err);
        }
    }
}
