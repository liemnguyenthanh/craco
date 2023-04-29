import { colors } from '@/constants/theme'
import styled from '@emotion/styled'
import { Box } from '@mui/system'

export const StyledTitleWrap = styled(Box)({
   display: 'flex',
})

export const StyledRoomWrap = styled(Box)(({ theme }: any) => ({
   position: 'relative',
   height: '100%',
}))

export const StyledRoom = styled(Box)(({ theme }: any) => ({
   height: '100%',
   transition: `all 0.3s`,
   overflow: 'hidden',
   backgroundColor: colors.black,

   [theme.breakpoints.up('md')]: {
      width: '350px',
   },
   [theme.breakpoints.down('md')]: {
      width: '100vw',
      left: 0
   },

}))

export const StyledContainerRoom = styled(Box)({
   padding: '15px 20px',
   display: 'flex',
   flexDirection: 'column',
})
