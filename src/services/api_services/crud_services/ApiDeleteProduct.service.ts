
import {  DeleteProductType} from "@services/services_types/Crud.types";
import axios, { AxiosError } from "axios";

export const ApiDeleteProduct: DeleteProductType = async ({id}) => {

    try {
        console.log(id);
        const response = await axios("http://localhost:8080/products", {
            method: "DELETE",
            data: {
                id
            }
        });
        return response.data;
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