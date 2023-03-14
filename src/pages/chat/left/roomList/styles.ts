import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { List } from "@mui/material";
import { Box } from "@mui/system";

export const StyledWrap = styled(Box)({
   height: 'calc(100% - 72px)',
   overflow: 'scroll',
   borderBottom: `1px solid ${colors.whiteDark}`,
 })
 
 export const StyledWrapList = styled(List)({
   width: '100%',
   height: '100%',
   padding: 0
 })