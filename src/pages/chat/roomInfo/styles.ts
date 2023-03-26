import { colors } from '@/constants/theme'
import styled from '@emotion/styled'
import { Button } from '@mui/material'
import { Box } from '@mui/system'

export const StyledRoomWrap = styled(Box)({
   position: 'relative',
   height: '100%'
})

export const StyledRoom = styled(Box)({
   width: '350px',
   transition: `all 0.3s`,
   overflow: 'hidden',
   height: '100%',
   borderLeft: `1px solid ${colors.whiteDark}`,
})

export const StyledContainerRoom = styled(Box)({
   padding: '15px 20px'
})

export const StyledBtnExpand = styled(Button)({
   position: 'absolute',
   left: '-20px',
   top: '20px',
   minWidth: '40px',
   minHeight: '40px',
   border: `1px solid ${colors.whiteDark}`,
   backgroundColor: colors.blackPurple,
   borderRadius: '50%',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   cursor: 'pointer',
   zIndex: 3,
   transition: `all 0.3s`,
   '&:after': {
      position: 'absolute',
      content: "''",
      minWidth: '39px',
      minHeight: '39px',
      backgroundColor:  colors.blackPurple,
      borderRadius: '50%',
      zIndex: -1
   },
   '&:hover': {
      transform: 'scale(1.4)'
   }
})
