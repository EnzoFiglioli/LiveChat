import React from "react";
import random from "../assets/avatar.png";

interface MensajesProp{
  message: string,
  username: string,
  colorChat: string,
  fecha: string,
  avatarUrl: string
}

const Mensaje : React.FC<MensajesProp> = ({ message, username, colorChat, fecha, avatarUrl }) => {
  return (
    <div className="flex gap-2 min-w-[84px] p-2">
      <picture>
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={avatarUrl || random}
          alt={`Avatar de ${username}`}
        />
      </picture>
      <section className="bg-gray-200 p-2 rounded-lg shadow">
        <i className={`font-bold ${colorChat}`}>{username}</i>
        <p>{message}</p>
        <div className="text-end text-gray-600 text-sm">
          <span>{fecha}</span>
        </div>
      </section>
    </div>
  );
};

export default Mensaje;
