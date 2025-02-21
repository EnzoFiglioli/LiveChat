import { createContext, useState, ReactNode, useContext } from "react";
import { Message } from '../models/Message';

interface ChatContextType {
  chats: Message[];
  setChats: React.Dispatch<React.SetStateAction<Message[]>>;
}

// Inicializa el contexto con un valor por defecto
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chats, setChats] = useState<Message[]>([]);

  return (
    <ChatContext.Provider value={{ chats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = ()=> {
  const chat = useContext(ChatContext);
  if (!chat) {
    throw new Error("useChat debe usarse dentro de un ChatProvider");
  }
  return chat;
}
