import { colors } from "@/constants/theme";
import styled from "@emotion/styled";
import { Box } from "@mui/system";

export const StyledWrap = styled(Box)({
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   minWidth: 400,
   padding: 15,
   boxShadow: '5px 5px 21px 1px #cccccc16',
   borderRadius: 5,
   backgroundColor: colors.blackSecond
})

export const StyledModal = styled(Box)({
   position: 'absolute',
})


