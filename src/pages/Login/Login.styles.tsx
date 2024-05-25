import {
    SxProps,
    Theme,
  } from "@mui/material";
  
  export const textField_container: SxProps<Theme> = {
    width: "70%",
    minWidth: "20rem",
    margin: "0 auto 1rem",
  };
  
  export const textField_styles: SxProps<Theme> = {
    width: "100%",
    "& .MuiInputBase-input": {
      color: (theme) => theme.palette.mainText.main,
    },
    "& .MuiInputLabel-root": {
        
      color: (theme) => theme.palette.mainText.main,
    },
    "& .MuiInputBase-input::placeholder": {
      color: (theme) => theme.palette.mainText.main,
      opacity: 1,
    },
  };
  
  
  export const button_container: SxProps<Theme> = {
      display: "grid",
      width: "70%",
      minWidth: "20rem",
      margin: "0 auto 1rem",
      gridTemplateColumns: "repeat(2, 10rem)",
      justifyContent: "center",
      gap: "1rem",
    };
  
    export const register_btn: SxProps<Theme> = {
      padding: "1rem",
      backgroundColor: (theme) => theme.palette.registerBtn.bg,
      color: (theme) => theme.palette.registerBtn.text,
      borderRadius: 5,
    };
    export const login_btn: SxProps<Theme> = {
      padding: "1rem",
      backgroundColor: (theme) => theme.palette.loginBtn.bg,
      color: (theme) => theme.palette.loginBtn.text,
      borderRadius: 5,
      '&:hover': {
          color: (theme) => theme.palette.mainText.main,
        },
    };

    export const recovery_password_container: SxProps<Theme> = {
      display: "flex",
      justifyContent: "flex-end",
      width: "70%",
      minWidth: "20rem",
      margin: "0 auto 1rem",
    };
  
  