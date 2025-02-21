import { Usuario } from '../models/Usuario';
import {useEffect, useState} from 'react';
import { useChat } from '../context/ChatContext';

const UsuariosContainer = ({userSession} : {userSession:string}) => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); 
  const {setChats} = useChat();

  useEffect(()=>{
    fetch(`https://3000-idx-livechat-1740096392688.cluster-etsqrqvqyvd4erxx7qq32imrjk.cloudworkstations.dev/usuarios`)
      .then(res => res.json())
      .then(response => setUsuarios(response))
      .catch(err=> console.error(err));
  },[])
  
  function handlerSubmit(e: React.MouseEvent, username: string){
    e.preventDefault();
    if (!setChats) return console.error("Error: setChats no está disponible");
  
    fetch(`http://localhost:3000/mensajes/query?to=${username}&from=${userSession}`)
      .then(res => res.json())
      .then(res => setChats(res))
      .catch(err => console.error(err));
  }
  

  return (
    <div>
        <div
          className='overflow-auto'
        >
          {usuarios.map((i,ix)=>(
            <div 
              key={ix}
              className='bg-gray-700 p-2 rounded m-2 cursor-pointer text-xl flex gap-3'
              onClick={(e: React.MouseEvent)=> {
                sessionStorage.setItem("chat",i.username);
                handlerSubmit(e, i.username);
              }}
            >
              <span>{i.sexo == "Hombre" ? "H" : "M"}</span>
              <p>{i.username}</p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default UsuariosContainer
