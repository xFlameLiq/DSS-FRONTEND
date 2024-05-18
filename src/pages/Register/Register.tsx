import {
  Box,
  Container,
  Typography,
  TextField,
  useTheme,
  InputAdornment,
  Button,
} from "@mui/material";
import {
  button_container,
  login_btn,
  register_btn,
  textField_container,
  textField_styles,
} from "./Register.styles";
import { Email, Lock, Person } from "@mui/icons-material";
import RegisterForm from "./RegisterForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type FormInputs = {
  name: string;
  email: string;
  pass: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Se requiere un nombre"),
  email: yup
    .string()
    .email("No es un correo valido")
    .required("Campo requerido"),
  pass: yup.string().required("Contraseña es requerida"),
});

const Register = () => {
  const methods = useForm<FormInputs>({
    defaultValues: {
      name: "",
      email: "",
      pass: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = methods.handleSubmit((data) => {
    console.log(data);
    methods.reset();
  });

  const theme = useTheme();

  return (
    <>
      <Container
        maxWidth="tablet"
        sx={{
          marginTop: "10rem",
          padding: "0",
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.backgroundForm.main,
            padding: "2rem",
            borderRadius: 10,
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginTop: "1.5rem",
              marginBottom: "4rem",
              position: "relative",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: (theme) => theme.palette.mainText.main,
                fontWeight: "700",
                "&::after": {
                  content: "''",
                  position: "absolute",
                  top: 40,
                  right: "calc(50% - 50px)",
                  width: "100px",
                  height: "0.2rem",
                  backgroundColor: (theme) => theme.palette.icon.main,
                },
              }}
            >
              REGISTRO
            </Typography>
          </Box>
          <FormProvider {...methods}>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "2rem",
            }}
          >
            <RegisterForm name="name" email="email" pass="pass" />
          </Box>
          </FormProvider>
          <Box sx={button_container}>
            <Button type="submit" sx={register_btn} onClick={onSubmit}>Registrarse</Button>
            <Button sx={login_btn} href="login">
              Login
            </Button>
          </Box>
        </Box>
        {JSON.stringify(methods.watch())}
      </Container>
    </>
  );
};

export default Register;
