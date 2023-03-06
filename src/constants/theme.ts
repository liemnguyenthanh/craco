import { PaletteMode } from "@mui/material";

const modeTemplate = {
  //mode light 
  light: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#00000050",
    },
    text: {
      primary: "#000000",
    },
    border: {
      primary: "#3e4b5a"
    },
    shadow: "#ffffff",
  },

  //mode light 
  dark: {
    primary: {
      main: "#171821", 
    },
    secondary: {
      main: "#1c1d26",
    },
    active: {
      main: "#272835"
    },
    myBackground: {
      main: "#9068ff"
    },
    background: {
      default: "#171821",
    },
    text: {
      primary: '#ffffff',
    },
    border: {
      primary: "#6d6e76"
    },
    shadow: "#171821",
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