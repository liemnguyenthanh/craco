import { Box } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react'
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../../app/provider/theme';

const ThemeMode = () => {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
        cursor: 'pointer',
        borderColor: 'border.main',
        border: 0.5,
        borderRadius: 3,
        p: 1,
        mt: 2,
      }}
      onClick={colorMode.toggleColorMode}
    >
      {theme.palette.mode === 'dark' ? 'Turn on the Light' : 'Turn off the light'} 
      <IconButton sx={{ ml: 1 }} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  )
}

export default ThemeMode
