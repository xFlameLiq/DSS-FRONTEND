import Index from "@pages/Index";
import Login from "@pages/Login/Login";
import Register from "@pages/Register/Register";
import { ThemeContextProvider } from "@styles/theme/ThemeContextProvider";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "",
    element: 
    <ThemeContextProvider>
    <Index/>
    </ThemeContextProvider>,
    errorElement: "",
    children: [
      {
        path: "/",
        element: <Register />,
        errorElement: "",
      },
      {
        path: "login",
        element: <Login />,
        errorElement: "",
      },
    ],
  },
]);
