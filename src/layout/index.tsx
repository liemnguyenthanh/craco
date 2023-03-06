import { Box } from '@mui/system'
import React, { PropsWithChildren } from 'react'
import HeaderLayout from './header'

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box>
      <HeaderLayout />
      {children}
    </Box>
  )
}

export default MainLayout
