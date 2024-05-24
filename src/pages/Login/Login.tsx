import { Box, Container, Typography, useTheme, Button } from "@mui/material";
import { button_container, login_btn, register_btn } from "./Login.styles";
import LoginForm from "./LoginForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LoginCredentialsType } from "@services/services_types/Login";
import { useMutation } from "@tanstack/react-query";

type FormInputs = {
  email: string;
  pass: string;
};

type Props = {
  ApiAuthService: LoginCredentialsType;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("No es un correo valido")
    .required("Campo requerido"),
  pass: yup.string().required("Contraseña es requerida"),
});

const Login = ({ ApiAuthService }: Props) => {
  const { mutateAsync, isError, error, isSuccess, data } = useMutation({
    mutationKey: ["auth"],
    mutationFn: ApiAuthService,
  });

  const methods = useForm<FormInputs>({
    defaultValues: {
      email: "",
      pass: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = methods.handleSubmit(async ({ email, pass }) => {
    try {
      const response = await mutateAsync({
        request: {
          email: email,
          pass: pass,
        },
      });
      methods.reset();
    } catch (error) {
      console.error("Error creating user", error);
    }
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
                  content: "''", // Contenido vacío para el pseudo-elemento
                  position: "absolute",
                  top: 40,
                  right: "calc(50% - 50px)",
                  width: "100px",
                  height: "0.2rem",
                  backgroundColor: (theme) => theme.palette.icon.main,
                },
              }}
            >
              INICIAR SESIÓN
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
              <LoginForm email="email" pass="pass" />
            </Box>
          </FormProvider>
          {isSuccess && (
            <>
              <Box
                sx={{
                  width: "70%",
                  margin: "0 auto",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: theme.palette.success.main,
                  }}
                >
                  User Logged successfully {data}
                </Typography>
              </Box>
            </>
          )}
          {isError && (
            <>
              <Box
                sx={{
                  width: "70%",
                  margin: "0 auto",
                  textAlign: "center",
                  marginBottom: "1rem",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "600",
                    color: theme.palette.error.main,
                  }}
                >
                  {error.message + "."}
                </Typography>
              </Box>
            </>
          )}
          <Box sx={button_container}>
            <Button type="submit" sx={register_btn} onClick={onSubmit}>
              Iniciar Sesión
            </Button>
            <Button sx={login_btn} href="/">
              Registrarse
            </Button>
          </Box>
        </Box>
        {JSON.stringify(methods.watch())}
      </Container>
    </>
  );
};

export default Login;
