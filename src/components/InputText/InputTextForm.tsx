import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, TextField, useTheme } from "@mui/material";
import { ReactNode } from "react";
import { get, useController, useFormContext } from "react-hook-form";

type Props = {
  width?: string;
  height?: string;
  color: string;
  padding: string;
  margin: string;
  startIcon?: ReactNode | null;
  endIcon?: ReactNode | null;
  backgroundColor?: string;
  multiline: boolean;
  placeholder: string;
  iconColor?: string;
  maxWidth?: string;
  minWidth?: string;
  name: string;
  borderRadius: number;
  showPass?: boolean;
  type: string;

};

const InputTextForm = ({
  width = "5rem",
  height = "2rem",
  color,
  padding,
  margin,
  startIcon = `${(<Lock />)}`,
  endIcon = `${(<Lock />)}`,
  backgroundColor,
  multiline,
  placeholder = "Ingresa algo...",
  iconColor,
  maxWidth,
  minWidth,
  name,
  type,
  borderRadius = 5,
}: Props) => {
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { field } = useController({ name, control });

  const hasError = Boolean(errors[name]);

  const theme = useTheme();

  return (
    <>
      <TextField
        sx={{
          width,
          height,
          padding,
          margin,
          maxWidth,
          minWidth,
        }}
        {...field}
        type={type}
        placeholder={placeholder}
        multiline={multiline}
        helperText={get(errors, name)?.message}
        error={hasError}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ color: iconColor }}>
              {startIcon ? startIcon : null}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end" sx={{ color: iconColor }}>
              {endIcon ? endIcon : null}
            </InputAdornment>
          ),
          style: {
            borderRadius: theme.shape.borderRadius * borderRadius,
            color,
            backgroundColor,
            boxShadow: theme.shadows[3],
          },
        }}
      ></TextField>
    </>
  );
};

export default InputTextForm;
