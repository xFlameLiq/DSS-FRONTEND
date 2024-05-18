import ThemeContext from "@styles/theme/ThemeContextProvider";
import { useContext } from "react";

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error(
          "useUserContext must be applied inside in UserContextProvider."
        );
      }
    const {mode, theme, toggleDarkMode } = context;
    return {
        mode,
        theme, 
        toggleDarkMode,
    }
}