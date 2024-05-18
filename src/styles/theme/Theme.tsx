import {  } from "@mui/material/styles";


// Extiende la interfaz PaletteOptions de Material-UI para incluir el color personalizado
declare module "@mui/material/styles" {
    interface PaletteOptions {
      [key: string]: object | string | number // Acepta cualquier propiedad de tipo string
    }
    interface Palette {
      [key: string]: {
        main: string;
        light: string;
        dark: string;
        warning: string;
        info: string;
        success: string;
        contrastText: string;
        width: string;
      };
    }
  }
  
  declare module "@mui/material/styles" {
    interface BreakpointOverrides {
      xs: false; // removes the `xs` breakpoint
      sm: false;
      md: false;
      lg: false;
      xl: false;
      mobile: true; // adds the `mobile` breakpoint
      tablet: true;
      laptop: true;
      desktop: true;
      xldesktop: true;
    }
  }
  
  export const theme = ({

    shape: {
      borderRadius: 5,
    },
    typography: {
      fontFamily: 'Manrope, Roboto, Times New Roman, sans-serif',
    },
    breakpoints: {
      values: {
        mobile: 0,
        tablet: 600,
        laptop: 900,
        desktop: 1200,
        xldesktop: 1536,
      },
    },
    palette: {
      primary: {
        main: "#F0F2F8",
      },
      secondary: {
        main: "#01183C",
      },
      mainText: {
        main: "#FFFFFF"
      },
      textFieldBg: {
        main: "#515964",
      },
      backgroundBody: {
        main: "#D0D0D0"
      },
      icon: {
        main: "#03B075"
      },
      backgroundForm: {
        main: "#2B2F36"
      },
      loginBtn: {
        bg: "#FFFFFF",
        text: "#676768"
      },
      registerBtn: {
        bg: "#03B075",
        text: "#FFFFFF"
      },
      sidebarWidth: {
        width: "10.5rem" 
      },
      RHFerror: {
        main: "#d32f2f"
      },
      proceedColor: {
        main: "#4C961D"
      },
      cancelColor: {
        main: "#AA2F0A"
      },
      mode: "light",
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: '#D0D0D0', 
          },
        },
      },
    },
    
  });