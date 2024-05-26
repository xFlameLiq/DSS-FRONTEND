import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import {
  button_container,
  login_btn,
  update_btn,
  wrap_all_container,
} from "./UpdatePassword.styles";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { useEffect, useState } from "react";
import { UpdatePasswordType } from "@services/services_types/UpdatePassword.types";
import { useMutation } from "@tanstack/react-query";
import { useUpdatePasswordContext } from "@hooks/useUpdatePasswordContext";

type FormInputs = {
  newPass: string;
  newConfirmPass: string;
};

type Props = {
    UpdatePasswordService: UpdatePasswordType;
  };

const schema = yup.object().shape({
  newPass: yup
    .string()
    .min(8, "Debe tener al menos 8 caracteres")
    .required("Contraseña es requerida"),
  newConfirmPass: yup
    .string()
    .oneOf([yup.ref("newPass")], "La contraseña no coincide")
    .required(),
});

const UpdatePassword = ({UpdatePasswordService}: Props) => {
  const [passField, setPassField] = useState<string>("");
  const [veryWeak, setVeryWeak] = useState<boolean>(false);
  const [weak, setWeak] = useState<boolean>(false);
  const [medium, setMedium] = useState<boolean>(false);
  const [strong, setStrong] = useState<boolean>(false);

  const {url, setUrl} = useUpdatePasswordContext();

  const { data, mutateAsync, isError, error, isSuccess } = useMutation({
    mutationKey: ["UpdatePassword"],
    mutationFn: UpdatePasswordService,
  });

  useEffect(() => {
    let email = localStorage.getItem('email');
    email = JSON.parse(email);
    setUrl(email)
  }, [url])
  

  const methods = useForm<FormInputs>({
    defaultValues: {
      newPass: "",
      newConfirmPass: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = methods.handleSubmit(async ({ newPass, newConfirmPass }) => {
    console.log(newPass);
    console.log(newConfirmPass);
    try {
        const response = await mutateAsync({
          request: {
            email: url,
            newPass: newPass
          },
        });
        console.log(response);
      } catch (error) {
        console.error("Error recovering email", error);
      }
    methods.reset();
    localStorage.removeItem('email');
    setUrl("");
    setVeryWeak(false);
    setWeak(false);
    setMedium(false);
    setStrong(false);
    setPassField("");
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
                ACTUALIZAR CONTRASEÑA
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
                <UpdatePasswordForm
                  newPass="newPass"
                  newConfirmPass="newConfirmPass"
                  value={passField}
                  setValue={setPassField}
                  veryWeak={veryWeak}
                  weak={weak}
                  medium={medium}
                  strong={strong}
                  setVeryWeak={setVeryWeak}
                  setWeak={setWeak}
                  setMedium={setMedium}
                  setStrong={setStrong}
                />
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
                    La contraseña ha sido cambiada {data}
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
              <Button type="submit" sx={update_btn} onClick={onSubmit}>
                Actualizar contraseña
              </Button>
              <Button href="login" sx={login_btn}>
                Volver a Login
              </Button>
            </Box>
          </Box>
          {JSON.stringify(methods.watch())}
        </Container>

      </Box>
    </>
  );
};

export default UpdatePassword;
