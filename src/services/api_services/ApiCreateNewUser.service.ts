import { CreateNewUserType } from "@services/services_types/CreateNewUser.types";
import axios, { AxiosError } from "axios";
import { format } from 'date-fns';

export const ApiCreateNewUser: CreateNewUserType = async ({ request: {
    name, paternal_surname, maternal_surname, email, cp, birthdate, pass, emailRecovery
} }) => {

    const formattedBirthdate = format(new Date(birthdate), 'yyyy-MM-dd');
    if (!name) throw new Error("No hay un nombre");
    if (!email) throw new Error("No hay un correo");
    if (!pass) throw new Error("No hay una contraseña");
    try {
        const response = await axios("http://localhost:8080/users", {
            method: "POST",
            data: {
                name: name,
                paternal: paternal_surname,
                maternal: maternal_surname,
                email: email,
                cp: cp,
                birthdate: formattedBirthdate,
                pass: pass,
                emailRecovery: emailRecovery,
            }
        });
        return response.status;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                const serverError = axiosError.response.data as AxiosError;
                throw new Error(serverError.message);
                throw new Error(serverError.message + " " + serverError.code);
            }
            throw new Error("Error al conectar con el servidor");
        }
        throw new Error("Error inesperado, intente más tarde");
    }

}