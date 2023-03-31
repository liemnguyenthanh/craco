import { PaletteMode } from "@mui/material";

export const colors = {
   white: "#ffffff",
   whiteGrey: '#cccccc',
   purple: "#9068ff",
   black: "#171821",
   blackSecond: '#363636',
   blackPurple: "#1c1d26",
   blackLight: "#372f31",
   whiteDark: "#82828250",
   green: '#35cb73',
   grayLight: '#3f3d44e0',
}

const common = {
   typography: {
      fontFamily: [
         'BlinkMacSystemFont',
         '"Segoe UI"',
         'Roboto',
         '"Helvetica Neue"',
         'Arial',
         'sans-serif',
         '"Apple Color Emoji"',
         '"Segoe UI Emoji"',
         '"Segoe UI Symbol"',
       ].join(','),
   },
};

const modeTemplate = {
   //mode light 
   light: {
      primary: {
         main: colors.black,
         green: colors.green,
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
         main: colors.white,
         green: colors.green,
      },
      background: {
         default: colors.black,
         secondary: colors.blackLight,
         active: colors.purple,
      },
      border: {
         main: colors.whiteDark
      }
   }
}

export const getDesignTokens = (mode: PaletteMode) => ({
   ...common,
   palette: {
      mode,
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
      },
   }
});