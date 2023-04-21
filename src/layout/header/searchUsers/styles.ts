import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledSearch = styled(TextField)({
   maxWidth: '400px',
   height: '40px',
   "& fieldset": { border: 'none' },
})