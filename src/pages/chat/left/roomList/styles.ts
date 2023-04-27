import styled from "@emotion/styled";
import { List } from "@mui/material";
import { Box } from "@mui/system";

export const StyledWrap = styled(Box)({
   overflow: 'hidden',
})

export const StyledWrapList = styled(List)({
   width: '100%',
   padding: 0,
   '> div': {
      height: 'calc(100dvh - 120px)',
      overflowY: 'scroll',
   }
})