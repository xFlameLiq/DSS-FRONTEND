export type Products = {
    id: number;
    name: string;
    price: string;
    model: string;
}

export type ProductRequest = {
    request: Products;
}

export type ProductBody = {
    id: number;
    name: string;
    price: string;
    model: string;
}

export type UpdateProduct = {
    id: number;
    request: ProductBody;
}

export type DeleteProduct = {
    id: number;
}

export type GetAllProductsType = () => Promise<Products[]>;

export type CreateNewProductType = (request: Products) => Promise<number>;

export type UpdateProductType = (request: UpdateProduct) => Promise <number>;

export type DeleteProductType = (request: DeleteProduct) => Promise <number>