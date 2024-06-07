import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {
  appbar,
  button_container,
  captions,
  content_container,
  error,
  error_container,
  field,
  field_container,
  form_container,
  form_fields,
  navbar,
  rol,
  state_container,
  success,
  title,
  title_container,
  toolbar,
} from "./Crud.styles";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import InputTextForm from "@components/InputText/InputTextForm";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register_btn } from "@pages/Login/Login.styles";
import { CreateNewProductType } from "@services/services_types/Crud.types";
import { useMutation } from "@tanstack/react-query";

type user = {
  id: number;
  name: string;
  paternalSurname: string;
  email: string;
  rol: number;
};

type FormInputs = {
  name: string;
  model: string;
  price: number;
};

const schema = yup.object().shape({
  name: yup.string().required("Campo requerido"),
  model: yup.string().required("Campo requerido"),
  price: yup.number().required("Campo requerido"),
});

type Props = {
  CreateNewProductService: CreateNewProductType;
};

const Crud = ({ CreateNewProductService }: Props) => {
  const theme = useTheme();
  const [user, setUser] = useState<user | null>(null);

  const createProduct = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: CreateNewProductService,
  });

  const methods = useForm<FormInputs>({
    defaultValues: {
      name: "",
      model: "",
      price: 0,
    },
    resolver: yupResolver(schema),
  });

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

  const onSubmit = methods.handleSubmit(async ({ name, model, price }) => {
    try {
      await createProduct.mutateAsync({
        request: {
          name,
          model,
          price,
        },
      });
    } catch (e) {
      console.log(e);
    }
  });

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
        <FormProvider {...methods}>
          <Box sx={form_container}>
            <Box sx={title_container}>
              <Typography sx={title}>REGISTRAR PRODUCTO</Typography>
            </Box>
            <Box sx={form_fields}>
              <Box sx={field_container}>
                <Box sx={captions}>Nombre del producto:</Box>
                <Box sx={field}>
                  <InputTextForm
                    type="text"
                    name="name"
                    width="100%"
                    height="auto"
                    startIcon={null}
                    endIcon={null}
                    color={theme.palette.mainText.main}
                    backgroundColor={theme.palette.textFieldBg.main}
                    margin="0"
                    padding="0"
                    placeholder="Ingrese un nombre"
                    multiline={false}
                    borderRadius={1}
                  />
                </Box>
              </Box>
              <Box sx={field_container}>
                <Box sx={captions}>Modelo del producto:</Box>
                <Box sx={field}>
                  <InputTextForm
                    name="model"
                    type="text"
                    width="100%"
                    height="auto"
                    startIcon={null}
                    endIcon={null}
                    color={theme.palette.mainText.main}
                    backgroundColor={theme.palette.textFieldBg.main}
                    margin="0"
                    padding="0"
                    placeholder="Ingrese un modelo"
                    multiline={false}
                    borderRadius={1}
                  />
                </Box>
              </Box>
              <Box sx={field_container}>
                <Box sx={captions}>Precio del producto:</Box>
                <Box sx={field}>
                  <InputTextForm
                    name="price"
                    type="number"
                    width="100%"
                    height="auto"
                    startIcon={null}
                    endIcon={null}
                    color={theme.palette.mainText.main}
                    backgroundColor={theme.palette.textFieldBg.main}
                    margin="0"
                    padding="0"
                    placeholder="Ingrese el precio del producto"
                    multiline={false}
                    borderRadius={1}
                  />
                </Box>
              </Box>
            </Box>
            {createProduct.isError && (
              <Box sx={state_container}>
                <Typography sx={error}>
                  {createProduct.error?.message}
                </Typography>
              </Box>
            )}
            {createProduct.isSuccess && (
              <Box sx={state_container}>
                <Typography sx={success}>
                  {createProduct.data}
                </Typography>
              </Box>
            )}

            <Box sx={button_container}>
              <Button type="submit" sx={register_btn} onClick={onSubmit}>
                Registrar producto
              </Button>
            </Box>
            {JSON.stringify(methods.watch())}
          </Box>
        </FormProvider>
      </Box>
    </>
  );
};

export default Crud;
