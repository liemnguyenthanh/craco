import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { Box } from "@mui/system";

export const StyledWrap = styled(Box)({
   height: '40px',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   margin: 10,
})

export const StyledTitle = styled(Box)({
   fontSize: 24
})

export const StyledActions = styled(Box)({
})

export const StyledAction = styled(Button)({
   padding: 2,
   minWidth: 40,
   minHeight: 40,
   borderRadius: '50%',
   textAlign: 'center'
})
