import Chat from "./Chat";

export interface Chat {
  username: string,
  message: string,
  leido: boolean,
  messageMount: number,
  online: boolean
}

const Chatcontainer = () => {
  return (
    <div className="mt-5 flex flex-col gap-3">
      <Chat username={"Pepito"} message={"Jugamos un rato a God Of Wars?"} online={true} leido={false} messageMount={0}/>
      <Chat username={"Juanito"} message={"Che boludito viste que te dije que Driussi iba a andar?"} online={true} leido={false} messageMount={0} />
      <Chat username={"Bebelo"} message={"Avisame cuando estes?"} online={true} leido={false} messageMount={0}/>
      <Chat username={"Chinchu"} message={"Al final fuiste a comprar?"} online={true} leido={false} messageMount={0}/>
    </div>
  )
}

export default Chatcontainer
