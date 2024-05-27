import { Box, InputAdornment, TextField, useTheme } from "@mui/material";
import { get, useController, useFormContext } from "react-hook-form";
import { textField_container, textField_styles } from "./PasswordRecovery.styles";
import { MailLock, Person } from "@mui/icons-material";

type Props = {
    emailRecovery: string;
}



const PasswordRecoveryForm = ({emailRecovery}: Props) => {

    const {
        formState: { errors },
        control,
        setValue: RHFValue,
        clearErrors,
      } = useFormContext();

      const emailRecoveryController = useController({
        name: emailRecovery,
        control,
        defaultValue: "",
      });
    

    const hasEmailRecoveryError = Boolean(errors[emailRecovery]);

    const theme = useTheme();

  return (
    <>
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
    </>
  );
};

export default PasswordRecoveryForm;
