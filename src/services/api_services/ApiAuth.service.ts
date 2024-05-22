import { LoginCredentialsType } from "@services/services_types/Login";
import axios, { AxiosError } from "axios";

export const ApiAuth: LoginCredentialsType = async ({ request: {
    email, pass
} }) => {
    if (!email) throw new Error("No hay un correo");
    if (!pass) throw new Error("No hay una contraseña");
    try {
        const response = await axios("https://dss-backend-b44f.onrender.com/login", {
            method: "POST",
            data: {
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