import UpdatePasswordContext from "@contexts/UpdatePasswordContext";
import { useContext } from "react";

export const useUpdatePasswordContext = () => {
    const context = useContext(UpdatePasswordContext);
    if (!context) {
        throw new Error(
          "useUserContext must be applied inside in UserContextProvider."
        );
      }
    const { url, setUrl} = context;
    return {
       url,
       setUrl,
    }
}