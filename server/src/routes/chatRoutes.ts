import { Router, Request, Response, NextFunction } from "express";
import { crearMensaje, obtenerMensajes } from "../controller/chatController";

const route = Router();

route.post("/", (req: Request, res: Response, next:NextFunction) => crearMensaje(req, res, next));
route.get("/query", (req: Request, res: Response, next: NextFunction)=> obtenerMensajes(req, res, next));

export default route;
