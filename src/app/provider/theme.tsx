import React, { createContext } from 'react'
import { ThemeProvider as ThemeMui, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';
import { getDesignTokens } from '@/constants/theme';
import useLocalStorage from '@/hooks/useLocalStorage';
export const ColorModeContext = createContext({ toggleColorMode: () => { } })

function ThemeProvider({ children }: React.PropsWithChildren) {
   const [mode, setMode] = useLocalStorage<PaletteMode>("mode", 'dark')
   const colorMode = React.useMemo(() => ({
      toggleColorMode: () => {
         setMode((prevMode: PaletteMode) =>
            prevMode === 'light' ? 'dark' : 'light',
         );
      },
   }), [setMode]);

   const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

   return (
      <ColorModeContext.Provider value={colorMode}>
         <ThemeMui theme={theme}>
            <CssBaseline />
            {children}
         </ThemeMui>
      </ColorModeContext.Provider>
   );
}
export default ThemeProvider
