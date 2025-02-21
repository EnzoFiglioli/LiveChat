import { readFile, readFileSync, writeFile } from "node:fs";

export const pathDir = process.cwd() + "/src/data/usuarios.json";

export class Usuario {
    public id : number;
    public username: string;
    public name: string;
    public genre: string;
    public active: boolean;

    constructor(
        id: number,
        username: string,
        name: string,
        genre: string,
        active: boolean)
        {
            this.id = id;
            this.username = username;
            this.name = name;
            this.genre = genre;
            this.active = active;
        }

    

    public static findUserById(id: number) : Usuario | string {
        try{
            const usuarios : Usuario [] = JSON.parse(readFileSync(pathDir,"utf8"));
            const findUser = usuarios.find((i: Usuario)=> i.id === id);

            if(findUser){
                console.log({message: "Se encontro un usuario", user: findUser});
                return findUser;
            }
            console.log("No se encontro ningun usuario");
            return "No se encontro ningun usuario";

        }catch(err){
            console.log({message:"Error al obtener usuario", error:err})
            return "Error al obtener usuario";
        }
    }
}

