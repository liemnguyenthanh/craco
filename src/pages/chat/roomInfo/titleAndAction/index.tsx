import { colors } from "@/constants/theme"
import styled from "@emotion/styled"
import { Typography } from "@mui/material"
import { Box } from "@mui/system"

interface Props {
   title: string,
   titleAction: string,
   action: () => void
}
const TitleAndAction = ({ title, titleAction, action }: Props) => {
   return (
      <StyledWrap>
         <StyledTitle>{title}</StyledTitle>
         <StyledAction onClick={action}>{titleAction}</StyledAction>
      </StyledWrap>
   )
}

export default TitleAndAction

const StyledWrap = styled(Box)({
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center'
})

const StyledTitle = styled(Typography)({
   fontSize: '20px',
   fontWeight: '700',
   color: colors.white
})

const StyledAction = styled(Typography)({
   fontSize: '14px',
   fontWeight: '500',
   color: colors.purple,
   cursor: 'pointer'
})