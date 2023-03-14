import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const StyledWrap = styled(Box)({
  borderLeft: `1px solid ${colors.whiteDark}`,
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
})

export const StyledChooseRoom = styled(Box)({
  display: 'flex',
  justifyContent: "center",
  alignItems: 'center',
  height: '100%',
  fontSize: 40
})