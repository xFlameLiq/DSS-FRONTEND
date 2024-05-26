import { ApiCreateNewUser } from "@services/api_services/ApiCreateNewUser.service";
import { ApiAuth } from "@services/api_services/ApiAuth.service";
import { ApiPasswordRecovery } from "@services/api_services/ApiPasswordRecovery.service";
import { ApiUpdatePassword } from "@services/api_services/ApiUpdatePassword.service";


const ENVIRONMENT: string = import.meta.env.VITE_ENVIRONMENT; //DEV

let CreateNewUserImpl = ApiCreateNewUser;
let ApiAuthImpl = ApiAuth;
let PasswordRecoveryImpl = ApiPasswordRecovery;
let UpdatePasswordImpl = ApiUpdatePassword;


if (ENVIRONMENT === "PROD") { //PROD
    console.log(ENVIRONMENT);
    CreateNewUserImpl = ApiCreateNewUser;
    ApiAuthImpl = ApiAuth;
    PasswordRecoveryImpl = ApiPasswordRecovery;
    UpdatePasswordImpl = ApiUpdatePassword;
}

export {
    CreateNewUserImpl,
    ApiAuthImpl,
    PasswordRecoveryImpl,
    UpdatePasswordImpl,
}