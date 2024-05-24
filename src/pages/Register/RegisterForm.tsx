import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Box,
  InputAdornment,
  TextField,
  useTheme,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { get, useController, useFormContext } from "react-hook-form";
import {
  password_validators,
  textField_container,
  textField_styles,
} from "./Register.styles";

type Props = {
  name: string;
  email: string;
  pass: string;
  value: string;
  setValue: (value: string) => void;
  veryWeak: boolean;
  setVeryWeak: (value: boolean) => void;
  weak: boolean;
  setWeak: (value: boolean) => void;
  medium: boolean;
  setMedium: (value: boolean) => void;
  strong: boolean;
  setStrong: (value: boolean) => void;
};

const RegisterForm = ({ 
  name, 
  email, 
  pass, 
  value, 
  setValue,
  veryWeak,
  weak,
  medium,
  strong,
  setVeryWeak,
  setWeak,
  setMedium,
  setStrong,
}: Props) => {
  const theme = useTheme();

  const [showPass, setShowPass] = useState<boolean>(true);

  const {
    formState: { errors },
    control,
    setValue: RHFValue,
    clearErrors,
  } = useFormContext();

  const nameController = useController({
    name: name,
    control,
    defaultValue: "",
  });

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

  const handlePass = () => {
    setShowPass(!showPass);
  };

  const securityPassword = (e) => {
    const passwordSecurity = e?.target.value;
    RHFValue("pass", passwordSecurity);
    setValue(passwordSecurity);

    const hasLowerCase = /[a-z]/.test(passwordSecurity);
    const hasUpperCase = /[A-Z]/.test(passwordSecurity);
    const hasNumbers = /[0-9]/.test(passwordSecurity);
    const hasSpecialChar = /[!"#$%&'*+,-./:;?@^_]/.test(passwordSecurity);
    clearErrors(passController.field.name);
    clearErrors(nameController.field.name);
    if (hasLowerCase) {
      setVeryWeak(true);
    } else {
      setVeryWeak(false);
    }

    setVeryWeak(hasLowerCase);
    setWeak(hasNumbers);
    setMedium(hasUpperCase);
    setStrong(hasSpecialChar);
  };

  const hasNameError = Boolean(errors[name]);
  const hasEmailError = Boolean(errors[email]);
  const hasPassError = Boolean(errors[pass]);

  return (
    <>
      <Box sx={textField_container}>
        <TextField
          {...nameController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <Person />
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
          id={nameController.field.name}
          label=""
          placeholder="Nombre"
          helperText={get(errors, name)?.message}
          error={hasNameError}
        />
      </Box>
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
          id={emailController.field.name}
          label=""
          placeholder="Correo"
          helperText={get(errors, email)?.message}
          error={hasEmailError}
        />
      </Box>

      <Box sx={{ ...textField_container, marginBottom: "1rem" }}>
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
                sx={{
                  color: (theme) => theme.palette.icon.main,
                  cursor: "pointer",
                }}
                onClick={handlePass}
              >
                {showPass ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            ),
            style: {
              backgroundColor: theme.palette.textFieldBg.main,
              color: theme.palette.mainText.main,
            },
          }}
          id={passController.field.name}
          value={value}
          onChange={securityPassword}
          type={showPass ? "password" : "text"}
          placeholder="Contraseña"
          helperText={get(errors, pass)?.message}
          error={hasPassError}
        />
      </Box>
      <Box
        sx={{
          width: "70%",
          margin: "0 auto 1rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Box
          sx={{
            display: veryWeak ? "block" : "none",
            width: "5rem",
            height: "10px",
            backgroundColor: theme.palette.veryWeak.main,
            borderRadius: 5,
          }}
        />
        <Box
          sx={{
            display: weak ? "block" : "none",
            width: "5rem",
            height: "10px",
            backgroundColor: theme.palette.weak.main,
            borderRadius: 5,
          }}
        />
        <Box
          sx={{
            display: medium ? "block" : "none",
            width: "5rem",
            height: "10px",
            backgroundColor: theme.palette.medium.main,
            borderRadius: 5,
          }}
        />
        <Box
          sx={{
            display: strong ? "block" : "none",
            width: "5rem",
            height: "10px",
            backgroundColor: theme.palette.strong.main,
            borderRadius: 5,
          }}
        />
      </Box>
      <Box
        sx={{
          width: "70%",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            ...password_validators,
            color: veryWeak
              ? theme.palette.veryWeak.main
              : theme.palette.mainText.main,
          }}
        >
          * Contiene letras (a-z)
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...password_validators,
            color: weak ? theme.palette.weak.main : theme.palette.mainText.main,
          }}
        >
          * Contiene numeros (0-9)
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...password_validators,
            color: medium
              ? theme.palette.medium.main
              : theme.palette.mainText.main,
          }}
        >
          * Contiene una mayúscula (A-Z)
        </Typography>
        <Typography
          variant="body1"
          sx={{
            ...password_validators,
            color: strong
              ? theme.palette.strong.main
              : theme.palette.mainText.main,
          }}
        >
          * Contiene caracteres especiales (!"#$%&'*+,-./:;?@\^_)
        </Typography>
      </Box>
    </>
  );
};

export default RegisterForm;
