import { Request, Response, RequestHandler, NextFunction } from "express";
import Mensaje from "../models/Mensaje";
import { readFile, writeFile } from "fs";


export const crearMensaje: RequestHandler = (req: Request,res: Response, next: NextFunction) => {
    try{
        readFile(process.cwd() + "/data/mensajes.json","utf8",(err,data)=>{
            if(err) throw err;
            const mensajes : Mensaje [] = JSON.parse(data); 
            const newMensaje : Mensaje = req.body;

            mensajes.push(newMensaje);
            
            writeFile(process.cwd() + "/data/mensajes.json",JSON.stringify(mensajes),(err)=>{
                if (err) throw err;
                res.json({msg:"Mensaje creado exitosamente!"});
            });
        })

    }catch{
        res.status(500).json({msg:"Error al crear el mensaje"});
    }
}

export const obtenerMensajes: RequestHandler = (req: Request,res: Response, next: NextFunction) => {
    try {
        const userActive = req.query.from as string;
        const userRecive = req.query.to as string;
        
        if (!userActive || !userRecive) {
            res.status(400).json({ msg: "Faltan parámetros 'from' y 'to'" });
        }
        
        readFile(process.cwd() + "/data/mensajes.json", "utf8", (err,data)=>{
            if(err) throw err;
            const mensajes : Mensaje[] = JSON.parse(data);

            const findMensajes = mensajes.filter((i)=> i.from == userActive && i.to == userRecive || i.from == userRecive && i.to == userActive);
             
            // Si hay mensajes del usuario tanto de emisor como de receptor
            if(findMensajes.length > 0){
                res.json(findMensajes);
            } else{
                res.status(404).json({ msg: "No hay mensajes entre estos usuarios" });
            }
        });
    } catch (error) {
        res.status(500).json({ msg: "Error al obtener los mensajes", error });
    }
};
