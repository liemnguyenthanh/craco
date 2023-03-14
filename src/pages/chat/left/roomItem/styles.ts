import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const StyledReadMessage = styled(Box)({
   fontSize: '12px',
   borderRadius: "50%",
   marginTop: 5,
   width: '18px',
   height: '18px',
   lineHeight: '18px',
   textAlign: 'center',
   backgroundColor: colors.purple,
});

export const StyledUnReadMessage = styled(DoneAllIcon)({
   fontSize: '14px',
   color: colors.green
})

export const StyledMessage = styled('span')({
   overflow: "hidden",
   textOverflow: "ellipsis",
   display: "-webkit-box",
   WebkitLineClamp: "1",
   WebkitBoxOrient: "vertical",
})

export const StyledRight = styled(Box)({
   width: '50px',
   display: 'flex',
   flexDirection: "column",
   alignItems: 'end',
})
