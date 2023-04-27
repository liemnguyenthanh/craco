import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";

export const StyledNotFound = styled(Typography)({
  textAlign: "center",
  paddingTop: 10,
  fontSize: 30
})

export const StyledLoading = styled(Box)({
   height: 'calc(100dvh - 230px)',
   width: '100%',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center'
})
 