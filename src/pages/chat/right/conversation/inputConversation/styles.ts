import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { Box, TextField } from "@mui/material";

export const StyledWrap = styled(Box)({
   display: 'grid',
   gridTemplateColumns: '1fr 60px',
   borderTop: `1px solid ${colors.whiteDark}`
})

export const StyledInput = styled(TextField)({
   padding: 8,
   width: '100%',
   "& fieldset": { border: 'none' },
})