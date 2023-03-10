import { Box, Button, Popover } from '@mui/material'
import React, { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  buttonComponent: React.ReactNode 
}

const Toggles = ({ buttonComponent, children}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box>
      <Button id={id} variant="outlined" onClick={handleClick}>
        {buttonComponent}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {children}
      </Popover>
    </Box>
  )
}

export default Toggles
