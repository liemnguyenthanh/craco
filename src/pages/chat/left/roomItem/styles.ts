import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/system";
import DoneAllIcon from '@mui/icons-material/DoneAll';

export const StyledReadMessage = styled(Box)({
   fontSize: '12px',
   borderRadius: "20px",
   padding: '0 4px',
   marginTop: 5,
   minWidth: '22px',
   height: '22px',
   lineHeight: '22px',
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
   width: '75px',
   display: 'flex',
   flexDirection: "column",
   alignItems: 'end',
})
