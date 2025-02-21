import { Router, Request, Response, NextFunction } from "express";
import { findUserById, newUser, usuarios } from "../controller/usuarioController.js";

const route = Router();

route.post("/", (req: Request, res: Response, next:NextFunction) => newUser(req, res, next));
route.get("/", (req: Request, res: Response, next:NextFunction) => usuarios(req, res, next));
route.get("/:id", (req: Request, res: Response, next:NextFunction)=> findUserById(req, res, next));

export default route;
