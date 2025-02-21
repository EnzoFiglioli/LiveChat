import { pathDir, Usuario } from "../models/Usuario.js";
import { readFile, readFileSync, writeFile } from "fs";

export class UsuarioRepository{
    public static async save(user : Usuario){
        try{
            const data = await readFileSync(pathDir,"utf8");
            let usuarios : Usuario [] = JSON.parse(data); 
            const findUser = usuarios.find((i: Usuario) => i.username == user.username);
            
            if(!findUser){
                const newUser = {...user, id: usuarios.length  + 1 }; 
                usuarios.push(newUser);

                await writeFile(pathDir,JSON.stringify(usuarios), "utf8",(err)=>{
                    if(err) throw err;
                    console.log("¡Usuario creado exitosamente!");
                });
            }else{
                console.log("¡Ese usuario ya existe!");
            }
        }catch(err){
            console.log(err);
        }
    }
}