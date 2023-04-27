import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const StyledScrollToBottom = styled(Box)({
   position: 'absolute',
   right: 10,
   bottom: 100,
   width: 50,
   height: 50,
   lineHeight: '50px',
   textAlign: 'center',
   backgroundColor: colors.whiteDark,
   borderRadius: '50%',
   zIndex: 2,
   cursor: 'pointer'
})

export const StyledWrap = styled(Box)({
   position: 'relative',
   height: 'calc(100dvh - 230px)',
   padding: "16px 16px 0 16px",
   overflowY: "scroll",
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
