
import { CreateNewProductType } from "@services/services_types/Crud.types";
import { LoginCredentialsType } from "@services/services_types/Login.types";
import axios, { AxiosError } from "axios";

export const ApiCreateNewProduct: CreateNewProductType = async ({ request: {
    name, model, price
} }) => {
    
    if (price === 0) throw new Error("El precio no es válido");
    
    try {
        const response = await axios("http://localhost:8080/products", {
            method: "POST",
            data: {
                name,
                model,
                price,
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