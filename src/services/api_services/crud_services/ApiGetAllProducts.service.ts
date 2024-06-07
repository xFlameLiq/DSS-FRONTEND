
import {  GetAllProductsType } from "@services/services_types/Crud.types";
import axios, { AxiosError } from "axios";

export const ApiGetAllProducts: GetAllProductsType = async () => {

    try {
        const response = await axios("http://localhost:8080/products", {
            method: "GET",
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