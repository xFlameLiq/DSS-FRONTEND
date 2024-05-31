import {
  Email,
  Lock,
  LockReset,
  Person,
  Visibility,
  VisibilityOff,
  MailLock,
  LocationOn,
  Female,
  Male,
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
  paternal_surname: string;
  maternal_surname: string;
  email: string;
  cp: string;
  birthdate: string;
  pass: string;
  confirmPass: string;
  emailRecovery: string;
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
  paternal_surname,
  maternal_surname,
  email,
  cp,
  birthdate,
  pass,
  confirmPass,
  emailRecovery,
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
  const [confirmShowPass, setConfirmShowPass] = useState<boolean>(true);

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

  const paternalController = useController({
    name: paternal_surname,
    control,
    defaultValue: "",
  });


  const maternalController = useController({
    name: maternal_surname,
    control,
    defaultValue: "",
  });

  const emailController = useController({
    name: email,
    control,
    defaultValue: "",
  });

  const cpController = useController({
    name: cp,
    control,
    defaultValue: "",
  });

  const birthdateController = useController({
    name: birthdate,
    control,
    defaultValue: "",
  });


  const passController = useController({
    name: pass,
    control,
    defaultValue: "",
  });

  const confirmPassController = useController({
    name: confirmPass,
    control,
    defaultValue: "",
  });

  const emailRecoveryController = useController({
    name: emailRecovery,
    control,
    defaultValue: "",
  });

  const handlePass = () => {
    setShowPass(!showPass);
  };

  const handleConfirmPass = () => {
    setConfirmShowPass(!confirmShowPass);
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
  const hasPaternalError = Boolean(errors[paternal_surname]);
  const hasMaternalError = Boolean(errors[maternal_surname]);
  const hasEmailError = Boolean(errors[email]);
  const hasCPError = Boolean(errors[cp]);
  const hasBirthdateError = Boolean(errors[birthdate]);
  const hasPassError = Boolean(errors[pass]);
  const hasConfirmPassError = Boolean(errors[confirmPass]);
  const hasEmailRecoveryError = Boolean(errors[emailRecovery]);

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
          {...paternalController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <Male />
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
          id={paternalController.field.name}
          label=""
          placeholder="Apellido paterno"
          helperText={get(errors, paternal_surname)?.message}
          error={hasPaternalError}
        />
      </Box>
      <Box sx={textField_container}>
        <TextField
          {...maternalController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <Female />
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
          id={maternalController.field.name}
          label=""
          placeholder="Apellido materno"
          helperText={get(errors, maternal_surname)?.message}
          error={hasMaternalError}
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
      <Box sx={textField_container}>
        <TextField
          {...cpController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <LocationOn />
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
          id={cpController.field.name}
          type="number"
          label=""
          placeholder="Ingresa el código postal"
          helperText={get(errors, cp)?.message}
          error={hasCPError}
        />
      </Box>
      <Box sx={textField_container}>
        <TextField
          {...birthdateController.field}
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
          id={birthdateController.field.name}
          type="date"
          label=""
          placeholder="Fecha de nacimiento"
          helperText={get(errors, birthdate)?.message}
          error={hasBirthdateError}
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

      <Box sx={{ ...textField_container, marginBottom: "1rem" }}>
        <TextField
          {...confirmPassController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <LockReset />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  color: (theme) => theme.palette.icon.main,
                  cursor: "pointer",
                }}
                onClick={handleConfirmPass}
              >
                {confirmShowPass ? <Visibility /> : <VisibilityOff />}
              </InputAdornment>
            ),
            style: {
              backgroundColor: theme.palette.textFieldBg.main,
              color: theme.palette.mainText.main,
            },
          }}
          id={confirmPassController.field.name}
          type={confirmShowPass ? "password" : "text"}
          placeholder="Confirmar contraseña"
          helperText={get(errors, confirmPass)?.message}
          error={hasConfirmPassError}
        />
      </Box>
      <Box sx={textField_container}>
        <TextField
          {...emailRecoveryController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: (theme) => theme.palette.icon.main }}
              >
                <MailLock />
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
          id={emailRecoveryController.field.name}
          label=""
          placeholder="Correo de recuperación"
          helperText={get(errors, emailRecovery)?.message}
          error={hasEmailRecoveryError}
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
