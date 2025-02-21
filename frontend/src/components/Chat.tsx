import img from "../assets/avatar.png";
const Chat = ({username, message, leido,messageMount, online}) => {
  return (
    <div className='bg-gray-900 rounded py-2 px-2 flex justify-between cursor-pointer'>
      <div className="flex">
        <picture className='rounded flex p-2'>
            <img 
                src={img} 
                alt="avatar" 
                className="h-7 w-7 rounded object-cover rounded-full"
            />
        </picture>
        <section>
            <h5 className="font-bold">{username}<span className="text-green-500">{online ? "| En linea" : ""}</span></h5>
            <p className="text-gray-400">{message}</p>
        </section>
      </div>
        <p>23:41</p>
        {leido && 
        <span className="h-3 w-3 rounded-full bg-red-500 relative flex justify-center align-center items-center p-2">
          <p className="absolute text-xs">{messageMount}</p>  
        </span>}
    </div>
  )
}

export default Chat
