import { ApiCreateNewUser } from "@services/api_services/ApiCreateNewUser.service";
import { ApiAuth } from "@services/api_services/ApiAuth.service";
import { ApiPasswordRecovery } from "@services/api_services/ApiPasswordRecovery.service";
import { ApiUpdatePassword } from "@services/api_services/ApiUpdatePassword.service";
import { ApiCreateNewProduct } from "@services/api_services/crud_services/ApiCreateNewProduct.service";
import { ApiGetAllProducts } from "@services/api_services/crud_services/ApiGetAllProducts.service";
import { ApiDeleteProduct } from "@services/api_services/crud_services/ApiDeleteProduct.service";
import { ApiUpdateProduct } from "@services/api_services/crud_services/ApiUpdateProduct.service";


const ENVIRONMENT: string = import.meta.env.VITE_ENVIRONMENT; //DEV

let CreateNewUserImpl = ApiCreateNewUser;
let ApiAuthImpl = ApiAuth;
let PasswordRecoveryImpl = ApiPasswordRecovery;
let UpdatePasswordImpl = ApiUpdatePassword;
let CreateNewProductImpl = ApiCreateNewProduct;
let GetAllProductsImpl = ApiGetAllProducts;
let DeleteProductImpl = ApiDeleteProduct;
let UpdateProductImpl = ApiUpdateProduct;


if (ENVIRONMENT === "PROD") { //PROD
    console.log(ENVIRONMENT);
    CreateNewUserImpl = ApiCreateNewUser;
    ApiAuthImpl = ApiAuth;
    PasswordRecoveryImpl = ApiPasswordRecovery;
    UpdatePasswordImpl = ApiUpdatePassword;
    CreateNewProductImpl = ApiCreateNewProduct;
    GetAllProductsImpl = ApiGetAllProducts;
    UpdateProductImpl = ApiUpdateProduct;
    DeleteProductImpl = ApiDeleteProduct;
}

export {
    CreateNewUserImpl,
    ApiAuthImpl,
    PasswordRecoveryImpl,
    UpdatePasswordImpl,
    CreateNewProductImpl,
    GetAllProductsImpl,
    UpdateProductImpl,
    DeleteProductImpl,
}