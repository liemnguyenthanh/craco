import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";

export const StyledWrap = styled(Box)({
   margin: '0 20px',
   backgroundColor: colors.grayLight,
   borderRadius: 10,
   minHeight: 60,
   display: 'flex',
   alignItems: 'center',
})

export const StyledSecondWrap = styled(Box)({
   display: 'grid',
   flex: 1,
   gridTemplateColumns: '1fr 60px',
})

export const StyledInput = styled(TextField)({
   padding: '0 10px',
   width: '100%',
   "& fieldset": { border: 'none' },
})