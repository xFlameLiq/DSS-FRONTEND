import { Box, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { get, useController, useFormContext } from "react-hook-form";
import { textField_styles, textField_container, password_validators } from "./UpdatePassword.styles";
import { Lock, LockReset, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

type Props = {
  newPass: string;
  newConfirmPass: string;
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

const UpdatePasswordForm = ({ 
    newPass, 
    newConfirmPass,
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

    const [showPass, setShowPass] = useState<boolean>(true);
    const [confirmShowPass, setConfirmShowPass] = useState<boolean>(true);

  const {
    formState: { errors },
    control,
    setValue: RHFValue,
    clearErrors,
  } = useFormContext();

  const newPassController = useController({
    name: newPass,
    control,
    defaultValue: "",
  });

  const newConfirmPassController = useController({
    name: newConfirmPass,
    control,
    defaultValue: "",
  });

  const hasNewPassError = Boolean(errors[newPass]);
  const hasNewConfirmPassError = Boolean(errors[newConfirmPass]);

  const securityPassword = (e) => {
    const passwordSecurity = e?.target.value;
    RHFValue("newPass", passwordSecurity);
    setValue(passwordSecurity);

    const hasLowerCase = /[a-z]/.test(passwordSecurity);
    const hasUpperCase = /[A-Z]/.test(passwordSecurity);
    const hasNumbers = /[0-9]/.test(passwordSecurity);
    const hasSpecialChar = /[!"#$%&'*+,-./:;?@^_]/.test(passwordSecurity);
    clearErrors(newPassController.field.name);
    clearErrors(newConfirmPassController.field.name);
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

  const handlePass = () => {
    setShowPass(!showPass);
  };

  const  handleConfirmPass = () => {
    setConfirmShowPass(!confirmShowPass);
  };

  const theme = useTheme();



  return (
    <>
      <Box sx={{ ...textField_container, marginBottom: "1rem" }}>
        <TextField
          {...newPassController.field}
          sx={textField_styles}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ color: theme.palette.icon.main }}
              >
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment
                position="end"
                sx={{
                  color: theme.palette.icon.main,
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
          id={newPassController.field.name}
          value={value}
          onChange={securityPassword}
          type={showPass ? "password" : "text"}
          placeholder="Nueva contraseña"
          helperText={get(errors, newPass)?.message}
          error={hasNewPassError}
        />
      </Box>

      <Box sx={{ ...textField_container, marginBottom: "1rem" }}>
        <TextField
          {...newConfirmPassController.field}
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
          id={newConfirmPassController.field.name}
          type={confirmShowPass ? "password" : "text"}
          placeholder="Confirmar nueva contraseña"
          helperText={get(errors, newConfirmPass)?.message}
          error={hasNewConfirmPassError}
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

export default UpdatePasswordForm;
