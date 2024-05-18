import { Box, InputAdornment, TextField, useTheme } from "@mui/material";
import {
  inputProps_styles,
  InputLabelProps_styles,
  textField_container,
  textField_styles,
} from "./Login.styles";
import { Email, Lock } from "@mui/icons-material";
import { get, useController, useFormContext } from "react-hook-form";

type Props = {
  email: string;
  pass: string;
};

const LoginForm = ({ email, pass }: Props) => {
  const theme = useTheme();

  const {
    formState: { errors },
    control,
  } = useFormContext();

  const emailController = useController({
    name: email,
    control,
    defaultValue: "",
  });

  const passController = useController({
    name: pass,
    control,
    defaultValue: "",
  });

  const hasEmailError = Boolean(errors[email]);
  const hasPassError = Boolean(errors[pass]);

  return (
    <>
      <Box sx={textField_container}>
        <TextField
          {...emailController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <Email />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ color: "green" }}
              ></InputAdornment>
            ),
            style: {
              backgroundColor: theme.palette.textFieldBg.main,
              color: theme.palette.mainText.main,
            },
          }}
          id=""
          label=""
          placeholder="Correo"
          helperText={get(errors, email)?.message}
          error={hasEmailError}
        />
      </Box>

      <Box sx={textField_container}>
        <TextField
          {...passController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{ color: "green" }}
              ></InputAdornment>
            ),
            style: {
              backgroundColor: theme.palette.textFieldBg.main,
              color: theme.palette.mainText.main,
            },
          }}
          id=""
          label=""
          placeholder="Contraseña"
          helperText={get(errors, pass)?.message}
          error={hasPassError}
        />
      </Box>
    </>
  );
};

export default LoginForm;
