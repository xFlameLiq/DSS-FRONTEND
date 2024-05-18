import Index from "@pages/Index";
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
import { ThemeContextProvider } from "@styles/theme/ThemeContextProvider";
import { createBrowserRouter } from "react-router-dom";
import { ApiAuthImpl, CreateNewUserImpl } from "@config/ServicesContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const router = createBrowserRouter([
  {
    path: "",
    element: 
    <ThemeContextProvider>
        <QueryClientProvider client={queryClient}>
          <Index />
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
        element: <Login ApiAuthService={ApiAuthImpl}/>,
        errorElement: "",
      },
    ],
  },
]);
