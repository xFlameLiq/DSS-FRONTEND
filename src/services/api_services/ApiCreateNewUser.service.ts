import { CreateNewUserType } from "@services/services_types/CreateNewUser";
import axios, { AxiosError } from "axios";

export const ApiCreateNewUser: CreateNewUserType = async ({ request: {
    name, email, pass
} }) => {

    if (!name) throw new Error("No hay un nombre");
    if (!email) throw new Error("No hay un correo");
    if (!pass) throw new Error("No hay una contraseña");
    try {
        const response = await axios("https://dss-backend-b44f.onrender.com/employee", {
            method: "POST",
            data: {
                name: name,
                email: email,
                password: pass,
            }
        });
        return response.status;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const serverError = axiosError.response.data as AxiosError;
                throw new Error(serverError.message + " " + serverError.code);
            }
            throw new Error("Error al conectar con el servidor");
        }
        throw new Error("Error inesperado, intente más tarde");
    }

}