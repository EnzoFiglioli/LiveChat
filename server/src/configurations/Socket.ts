import { Usuario } from '../models/Usuario.js';
import { Server, Socket } from 'socket.io';

export const SocketConfig = (io: Server) => {
    io.on('connection', (socket: Socket) => {
        console.log('Nuevo cliente conectado:', socket.id);

        socket.on('usuarios',(data: Usuario)=>{
            Usuario.save(data);
        });

        socket.on('mensaje', (data: any) => {
            console.log('Mensaje recibido:', data);
            io.emit('mensaje', data);
        });

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
};
