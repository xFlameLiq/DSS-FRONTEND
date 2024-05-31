import { PasswordRecoveryType } from "@services/services_types/PasswordRecovery.types";
import axios, { AxiosError } from "axios";

export const ApiPasswordRecovery: PasswordRecoveryType = async ({ request: {
    emailRecovery
} }) => {

    if (!emailRecovery) throw new Error("No hay un correo de recuperación");
    try {
        const response = await axios("http://localhost:8080/password-recovery", {
            method: "POST",
            data: {
                emailRecovery: emailRecovery
            }
        });
        const {data, status} = response;
        return {
            data,
            status
        };
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