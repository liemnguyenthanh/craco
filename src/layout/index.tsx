import { Box } from '@mui/system'
import { PropsWithChildren } from 'react'
import HeaderLayout from './header'

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <HeaderLayout />
      {children}
    </Box>
  )
}

export default MainLayout
