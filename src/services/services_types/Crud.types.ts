export type Products = {
    id: number;
    name: string;
    model: string;
    price: number;
}

export type ProductBody = {
    name: string;
    model: string;
    price: number;

}
export type ProductRequest = {
    request: ProductBody;
}



export type UpdateProduct = {
    id: number;
    request: ProductBody;
}

export type DeleteProduct = {
    id: number;
}

export type GetAllProductsType = () => Promise<Products[]>;

export type CreateNewProductType = ({request}: ProductRequest) => Promise<number>;

export type UpdateProductType = ({id, request}: UpdateProduct) => Promise <number>;

export type DeleteProductType = (request: DeleteProduct) => Promise <number>