import { PaletteMode } from "@mui/material";
const colors = {
  white: "#ffffff",
  purple: "#9068ff",
  black: "#171821",
  blackPurple: "#272835",
  blackLight: "#1c1d26",
  whiteDark: "#828282",

}
const common = {
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
};

const modeTemplate = {
  //mode light 
  light: {
    primary: {
      main: colors.black
    },
    background: {
      default: colors.white,
      secondary: colors.whiteDark,
    },
    border: {
      main: colors.whiteDark
    }
  },

  //mode light 
  dark: {
    primary: {
      main: colors.white
    },
    background: {
      default: colors.black,
      secondary: colors.blackPurple,
      active: colors.purple,
    },
    border: {
      main: colors.whiteDark
    }
  }
}

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...common,
    ...modeTemplate[mode]
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          ':-webkit-autofill': {
          }
        },
      }
    }
  }
});