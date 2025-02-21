import React, { useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import ChatContainer from "./components/Chatcontainer";
import SalasContainer from "./components/SalasContainer";
import UsuariosContainer from "./components/UsuariosContainer";
import Mensaje from "./components/Mensaje";
import { Message } from "./models/Message";
import { Usuario } from "./models/Usuario";
import { ChatContext } from "./context/ChatContext";

const socket = io("http://localhost:3000", { transports: ["websocket"] });

const App = () => {
    const useMensaje = useContext(ChatContext);
    const chats = useMensaje?.chats || [];
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>(()=> chats || []);
    const [section, setSection] = useState("Chats");
    const [tempUsername, setTempUsername] = useState("");
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    useEffect(() => {
        if (usuario) {
            sessionStorage.setItem("usuario", JSON.stringify(usuario));
        }
    }, [usuario]);
    

    useEffect(() => {
        socket.on("connect_error", (err) => console.error("Error de conexión:", err.message));
        socket.on("disconnect", () => console.warn("Desconectado del servidor"));
        socket.on("reconnect", (attempt) => console.log("Reconectado, intento:", attempt));
        socket.on("messages", (mensajes: Message[]) => setMessages(mensajes.reverse()));

        return () => {
            socket.off("connect_error");
            socket.off("disconnect");
            socket.off("reconnect");
            socket.off("messages");
            socket.off("usuarios");
        };
    }, []);

    useEffect(() => {
        if (usuario) {
            socket.emit("usuarios", usuario);
        }
    }, [usuario]);

    const randomColor = (): string => {
        const colors = ["text-red-500", "text-blue-500", "text-green-500", "text-yellow-600", "text-orange-500", "text-cyan-500"];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const handlerSection = (e: React.MouseEvent<HTMLHeadingElement>) => {
        setSection(e.currentTarget.textContent || "");
    };

    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim() || !usuario) return;

        const newMessage: Message = {
            from: usuario.username,
            to: sessionStorage.getItem("chat") ?? "",
            message,
            leido: false,
            fecha: new Date().toISOString(),
        };

        socket.emit("message", newMessage,()=>{
            fetch("http://localhost:3000/mensajes",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    newMessage
                })
            })
            
        });
        setMessage("");
    };

    const handleSaveUser = () => {
        if (tempUsername.trim()) {
            const newUser = {
                username: tempUsername.trim(),
                mainColor: randomColor(),
                sexo: "Indefinido",
            };
            setUsuario(newUser);
            sessionStorage.setItem("usuario", JSON.stringify(newUser));
        }
    };
    useEffect(()=>{
        console.log(chats);
    },[])

    return (
        <div className="flex h-screen relative">
            {!usuario && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                        <h2 className="text-lg font-bold mb-2">Ingresa tu nombre</h2>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            className="w-full p-2 border rounded-md mb-4"
                            value={tempUsername}
                            onChange={(e) => setTempUsername(e.target.value)}
                        />
                        <select
                            onChange={(e) => setUsuario((prev) => prev ? { ...prev, sexo: e.target.value } : null)}
                            className="w-full p-2 border rounded-md mb-4"
                        >
                            <option value="Indefinido">Prefiero no decirlo</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Hombre">Hombre</option>
                        </select>
                        <button
                            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                            onClick={handleSaveUser}
                        >
                            Guardar
                        </button>
                    </div>
                </div>
            )}

            <aside className="w-1/4 bg-gray-800 text-white p-4 hidden md:block overflow-scroll">
                <span className="flex justify-between">
                    <h2 className={`text-lg font-bold cursor-pointer ${section === "Chats" ? "border-b-4 border-indigo-500" : ""}`} onClick={handlerSection}>Chats</h2>
                    <h2 className={`text-lg font-bold cursor-pointer ${section === "Salas" ? "border-b-4 border-indigo-500" : ""}`} onClick={handlerSection}>Salas</h2>
                    <h2 className={`text-lg font-bold cursor-pointer ${section === "Usuarios" ? "border-b-4 border-indigo-500" : ""}`} onClick={handlerSection}>Usuarios</h2>
                </span>
                {section === "Chats" && <ChatContainer />}
                {section === "Salas" && <SalasContainer />}
                {section === "Usuarios" && <UsuariosContainer  userSession={usuario?.username} />}
            </aside>

            <section className="flex-1 flex flex-col bg-gray-100">
                <header className="p-4 bg-blue-600 text-white text-center font-semibold flex justify-between">
                    <span>{sessionStorage.getItem("chat") || "#ChatArgentino"}</span>
                    <span className="text-xl text-center cursor-pointer">...</span>
                </header>
                <main className="flex-1 p-4 overflow-y-auto flex flex-col-reverse bg-gradient-to-t from-sky-500 to-indigo-500">
                    {messages.length > 0 ? messages.map((msg, ix) => (
                        <div key={ix}>
                            <Mensaje message={msg.message} username={msg.from} colorChat="text-blue-400" fecha={msg.fecha} avatarUrl={""}/>
                        </div>
                    )) : <h1 className="text-center text-gray-500">No hay mensajes</h1>}
                </main>
                <footer className="p-4 bg-white border-t flex items-center gap-2">
                    <form onSubmit={handlerSubmit} className="w-full flex">
                        <input type="text" className="flex-1 p-2 border rounded-md" placeholder="Escribe un mensaje..." value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Enviar</button>
                    </form>
                </footer>
            </section>
        </div>
    );
};

export default App;
