import Index from "@pages/Index";
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
import { ThemeContextProvider } from "@styles/theme/ThemeContextProvider";
import { createBrowserRouter } from "react-router-dom";
import { ApiAuthImpl, CreateNewProductImpl, CreateNewUserImpl, DeleteProductImpl, GetAllProductsImpl, PasswordRecoveryImpl, UpdatePasswordImpl, UpdateProductImpl } from "@config/ServicesContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PasswordRecovery from "@pages/PasswordRecovery/PasswordRecovery";
import UpdatePassword from "@pages/PasswordRecovery/UpdatePassword";
import { UpdatePasswordContextProvider } from "@contexts/UpdatePasswordContext";
import Crud from "@pages/Crud/Crud";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "",
    element: 
    <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          <UpdatePasswordContextProvider>
          <Index />
          </UpdatePasswordContextProvider>
        </QueryClientProvider>
    </ThemeContextProvider>,
    errorElement: "",
    children: [
      {
        path: "/",
        element: <Register  CreateNewUserService={CreateNewUserImpl}/>,
        errorElement: "",
      },
      {
        path: "login",
        element: <Login AuthService={ApiAuthImpl}/>,
        errorElement: "",
      },
      {
        path: "password-recovery",
        element: <PasswordRecovery PasswordRecoveryService={PasswordRecoveryImpl}/>,
        errorElement: "",
      },
      {
        path: "update-password",
        element: <UpdatePassword UpdatePasswordService={UpdatePasswordImpl}/>,
        errorElement: "",
      },
      {
        path: "crud",
        element: <Crud 
          CreateNewProductService={CreateNewProductImpl} 
          UpdateProductService={UpdateProductImpl}
          DeleteProductService={DeleteProductImpl}
          GetAllProductsService={GetAllProductsImpl}
          />,
        errorElement: "",
      }

    ],
  },
]);
