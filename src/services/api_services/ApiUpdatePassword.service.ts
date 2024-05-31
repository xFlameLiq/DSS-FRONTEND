import { UpdatePasswordType } from "@services/services_types/UpdatePassword.types";
import axios, { AxiosError } from "axios";

export const ApiUpdatePassword: UpdatePasswordType = async ({ 
    request: {
        email,
        newPass
    } 
}) => {

    if (!newPass) throw new Error("No hay una nueva contraseña por actualizar");
    try {
        const response = await axios("http://localhost:8080/update-password", {
            method: "POST",
            data: {
                email: email,
                newPass: newPass
            }
        });
        return response.status;
        
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const serverError = axiosError.response.data as AxiosError;
                console.log(serverError);
                throw new Error(serverError.message);
                throw new Error(serverError.message + " " + serverError.code);
            }
            throw new Error("Error al conectar con el servidor");
        }
        throw new Error("Error inesperado, intente más tarde");
    }

}