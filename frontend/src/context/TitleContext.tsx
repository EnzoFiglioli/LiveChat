import { createContext, useContext, useState } from "react";

const TitleContext = createContext();

export const TitlteProvider = ({children})=>{
    const [title, setTitle] = useState("");
    return (
        <TitleContext value={title, setTitle}>
            {children}
        </TitleContext>
    )
}

export const useTitle = () => {
    const useTitle = useContext(TitlteProvider);
    return useTitle;
}