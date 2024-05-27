import { ReactNode, createContext, useState } from "react";

type UpdatePasswordContextProviderProps = {
    children: ReactNode;
};
type UpdatePasswordContextType = {
    url: string;
    setUrl: (e: string) => void;
};

const UpdatePasswordContext = createContext<UpdatePasswordContextType>({
    url: "",
    setUrl: () => { },
});

export const UpdatePasswordContextProvider = ({
    children,
}: UpdatePasswordContextProviderProps) => {

    const [url, setUrl] = useState<string>("");

    return (
        <UpdatePasswordContext.Provider value={{url, setUrl}}>
            {children}
        </UpdatePasswordContext.Provider>

  );
};

export default UpdatePasswordContext;
