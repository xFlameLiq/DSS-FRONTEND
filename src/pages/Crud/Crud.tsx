import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  appbar,
  content_container,
  navbar,
  navbar_content,
  rol,
  toolbar,
} from "./Crud.styles";
import { useEffect, useState } from "react";

type user = {
  id: number;
  name: string;
  paternalSurname: string;
  email: string;
  rol: number;
};

const Crud = () => {
  const [user, setUser] = useState<user | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userObject = JSON.parse(user);
        setUser(userObject);
      } catch (error) {
        console.error("Error parsing user from localStorage", error);
      }
    }
  }, []);

  const onCloseSesion = () => {
    window.location.replace("http://localhost:5173/login");
    alert("Sesión cerrada!");
    localStorage.removeItem("user");
  };

  return (
    <>
      <AppBar position="fixed" sx={appbar}>
        <Toolbar sx={toolbar}>
          <Box>
            <Typography variant="body1" color="initial">
              Bienvenido {`${user?.name} ${user?.paternalSurname}`}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body1" color="initial">
              PRIVILEGIO:
              {user?.rol === 0 ? (
                <Typography sx={rol}>{` CLIENTE`}</Typography>
              ) : null}
              {user?.rol === 1 ? (
                <Typography sx={rol}>{` FACTURA`}</Typography>
              ) : null}
              {user?.rol === 2 ? (
                <Typography sx={rol}>{` ADMINISTRADOR`}</Typography>
              ) : null}
            </Typography>
          </Box>
          <Box>
            <Button color="inherit" onClick={onCloseSesion}>
              Cerrar sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={content_container}>

        a
      </Box>
    </>
  );
};

export default Crud;
