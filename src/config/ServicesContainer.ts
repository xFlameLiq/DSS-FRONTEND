import { ApiCreateNewUser } from "@services/api_services/ApiCreateNewUser.service";
import { ApiAuth } from "@services/api_services/ApiAuth.service";


const ENVIRONMENT: string = import.meta.env.VITE_ENVIRONMENT; //DEV

let CreateNewUserImpl = ApiCreateNewUser;
let ApiAuthImpl = ApiAuth;


if (ENVIRONMENT === "PROD") { //PROD
    console.log(ENVIRONMENT);
    CreateNewUserImpl = ApiCreateNewUser;
    ApiAuthImpl = ApiAuth;
}

export {
    CreateNewUserImpl,
    ApiAuthImpl
}