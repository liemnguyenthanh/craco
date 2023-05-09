import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { List } from "@mui/material";
import { Box } from "@mui/system";

export const StyledWrap = styled(Box)({
   overflow: 'hidden',
})

export const StyledWrapList = styled(List)({
   width: '100%',
   padding: 0,
   height: 'calc(100dvh - 120px)',
   overflowY: 'scroll',
   '&::-webkit-scrollbar': {
      width: '0.4em'
   },
   '&::-webkit-scrollbar-track': {
      'WebkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
   },
   '&::-webkit-scrollbar-thumb': {
      backgroundColor: colors.purple,
   }
})