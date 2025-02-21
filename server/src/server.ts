import express from "express";
import { Application } from 'express';
import { Server } from 'socket.io';
import {SocketConfig} from "./configurations/Socket.js";
import usuarioRoutes from "./routes/usuariosRoutes.js";

const app: Application = express();
const port: number = 3000;

// Middlewares
app.use(express.json());

// Routes
app.use("/usuarios", usuarioRoutes);

const server = app.listen(port, () => {
    console.clear();
    console.log(`Server iniciado en el puerto ${port}`);
    console.log(`http://localhost:${port}/`);
});

const io = new Server(server, { pingTimeout: 60000 });
SocketConfig(io);

server;
