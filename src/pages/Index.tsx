import { useThemeContext } from "@hooks/useThemeContext";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

const Index = () => {

  const {theme} = useThemeContext();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Outlet />
        </CssBaseline>
      </ThemeProvider>
    </>
  );
};

export default Index;
