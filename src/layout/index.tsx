import { Box } from '@mui/system'
import React, { PropsWithChildren } from 'react'
import HeaderLayout from './header'

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ overflow: 'scroll' }}>
      <HeaderLayout />
      {children}
    </Box>
  )
}

export default MainLayout
