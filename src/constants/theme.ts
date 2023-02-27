import { PaletteMode } from "@mui/material";

const modeTemplate = {
  //mode light 
  light: {
    text: {
      primary: "#000000",
    },
    shadow: "#ffffff",
  },

  //mode light 
  dark: {
    background: {
      default: "#0b1929",
    },
    text: {
      primary: '#ffffff',
    },
    shadow: "#0b1929",
  }
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...modeTemplate[mode]
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          ':-webkit-autofill': {
            WebkitBoxShadow: `0 0 0 100px ${modeTemplate[mode].shadow} inset`,
          }
        }
      }
    }
  }
});