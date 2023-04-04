import styled from "@emotion/styled";
import { Box } from "@mui/system";


export const StyledWrap = styled(Box)({
   height: '100%',
   width: '100%',
   overflow: 'hidden'
})

export const StyledSecondWrap = styled(Box)({
   height: '100%',
   position: 'relative',
   display: 'flex',
   width: '200%',
   flexWrap: 'wrap',
   transition: 'transform 0.5s',
   '> div': {
      width: '50%',
      overflowX: 'hidden'
   }
})

export const StyledMain = styled(Box)({
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
})

export const StyledCreateRoom = styled(Box)({
   height: '100%',
})




