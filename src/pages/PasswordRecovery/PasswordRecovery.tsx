import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import {
  button_container,
  login_btn,
  sendEmail_btn,
  wrap_all_container,
} from "./PasswordRecovery.styles";
import PasswordRecoveryForm from "./PasswordRecoveryForm";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PasswordRecoveryResponse, PasswordRecoveryType } from "@services/services_types/PasswordRecovery.types";
import { useMutation } from "@tanstack/react-query";
import { useUpdatePasswordContext } from "@hooks/useUpdatePasswordContext";

type FormInputs = {
  emailRecovery: string;
};

type Props = {
  PasswordRecoveryService: PasswordRecoveryType;
};

const schema = yup.object().shape({
  emailRecovery: yup
    .string()
    .email("No es un correo valido")
    .required("Campo requerido"),
});

const PasswordRecovery = ({ PasswordRecoveryService }: Props) => {
  const { setUrl } = useUpdatePasswordContext();

  const { data, mutateAsync, isError, error, isSuccess } = useMutation({
    mutationKey: ["PasswordRecovery"],
    mutationFn: PasswordRecoveryService,
    onSettled: ({data, status}) => {
      if(data){
        localStorage.setItem('email', JSON.stringify(data.email));
        setUrl(data.email);
      }
 
    },
  });

  const methods = useForm<FormInputs>({
    defaultValues: {
      emailRecovery: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = methods.handleSubmit(async ({ emailRecovery }) => {
    console.log(emailRecovery);
    try {
      const response = await mutateAsync({
        request: {
          emailRecovery: emailRecovery,
        },
      });
      console.log(response);
    } catch (error) {
      console.error("Error recovering email", error);
    }
  });

  const theme = useTheme();

  return (
    <>
      <Box sx={wrap_all_container}>
        <Container
          maxWidth="tablet"
          sx={{
            padding: "0",
          }}
        >
          <Box
            sx={{
              backgroundColor: theme.palette.backgroundForm.main,
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
                  color: theme.palette.mainText.main,
                  fontWeight: "700",
                  "&::after": {
                    content: "''",
                    position: "absolute",
                    top: 40,
                    right: "calc(50% - 50px)",
                    width: "100px",
                    height: "0.2rem",
                    backgroundColor: theme.palette.icon.main,
                  },
                }}
              >
                RECUPERAR CONTRASEÑA
              </Typography>
            </Box>
            <Box
              sx={{
                width: "70%",
                minWidth: "20rem",
                margin: "0 auto 2rem",
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  color: theme.palette.mainText.main,
                  fontWeight: "300",
                }}
              >
                Ingrese un correo para recuperar contraseña
              </Typography>
            </Box>
            <FormProvider {...methods}>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "1rem",
                }}
              >
                <PasswordRecoveryForm emailRecovery="emailRecovery" />
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
                    Email sent successfully {data.status}
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
              <Button type="submit" sx={sendEmail_btn} onClick={onSubmit}>
                Enviar correo
              </Button>
              <Button href="login" sx={login_btn}>
                Volver a Login
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default PasswordRecovery;
