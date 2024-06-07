
import {  GetAllProductsType, UpdateProductType } from "@services/services_types/Crud.types";
import axios, { AxiosError } from "axios";

export const ApiUpdateProduct: UpdateProductType = async ({id, request: {
    name, model, price
}}) => {

    try {
        const response = await axios("http://localhost:8080/products", {
            method: "PATCH",
            data: {
                id,
                name,
                model,
                price
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