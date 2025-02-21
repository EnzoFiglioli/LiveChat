import { Request, Response, RequestHandler, NextFunction } from "express";
import { readFile, writeFile } from "fs";
import { Usuario } from "../models/Usuario.js";

export const newUser: RequestHandler = (req: Request, res: Response): void => {
    try{
        const usuario = req.body.username;
        readFile(process.cwd() + "/src/data/usuarios.json","utf8",(err,data)=>{
            if(err) throw err;
            let dataUsuarios: Usuario [] = JSON.parse(data); 
            const findUser = dataUsuarios.find((i) => i.username == usuario);
            
            if(!findUser){               
                const newUser = {
                    ...req.body,
                    id: dataUsuarios.length + 1
                }
                dataUsuarios.push(newUser);
                writeFile(process.cwd() + "/src/data/usuarios.json",JSON.stringify(dataUsuarios),"utf8",(err)=>{
                    if (err) throw err;
                    res.json({msg:`Usuario creado exitosamente, bienvenido ${usuario}`});
                });
            }else{
                res.status(400).json({msg:"Ya existe un usuario con ese nombre. Prueba otro"});
            }
        });
    }catch{
        res.status(500).json({msg:"Error al crear usuario"});
    }
};

export const usuarios: RequestHandler = (req: Request, res: Response, next:NextFunction): void => {
    readFile(process.cwd() + "/src/data/usuarios.json","utf8",(err,data)=>{
        if(err) throw err;
        res.json(JSON.parse(data));
    });
};

export const findUserById : RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    try{
        const idUser = parseInt(req.params.id);
        const user = Usuario.findUserById(idUser);
        if(user){
            res.json(user);
        }else{
            res.status(404).json({msg:"Usuario no encontrado"});
        }
    }catch(err){
        res.status(500).json(err);
    }
}

