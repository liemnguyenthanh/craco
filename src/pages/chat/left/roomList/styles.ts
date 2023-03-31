import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { List } from "@mui/material";
import { Box } from "@mui/system";

export const StyledWrap = styled(Box)({
   overflow: 'hidden',
   borderBottom: `1px solid ${colors.whiteDark}`,
})

export const StyledWrapList = styled(List)({
   width: '100%',
   padding: 0,
   '> div': {
      height: 'calc(100vh - 72px)',
      overflowY: 'scroll',
   }
})