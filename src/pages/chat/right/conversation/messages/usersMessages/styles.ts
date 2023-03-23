import { colors } from "@/constants/theme"
import styled from "@emotion/styled"
import { Box } from "@mui/system"

export const StyledWrap = styled(Box)`
   display: flex;
   gap: 10px;
`

export const StyledList = styled(Box)`
   display: flex;
   gap: 4px;
   flex-direction: column;
   max-width: 'calc(100% - 100px)';
`

export const styles = {
   message: (isMySelf: boolean) => ({
      whiteSpace: 'pre-line',
      wordBreak: "break-all",
      p: "8px 12px",
      border: 0.5,
      borderColor: "border.main",
      borderRadius: isMySelf ? "15px 5px 5px 15px" : "5px 15px 15px 5px",
      width: "fit-content",
      fontSize: "14px",
      backgroundColor: isMySelf ? colors.purple : colors.blackLight,
      color: isMySelf ? colors.white : colors.whiteGrey,
      "&:first-of-type": {
         [isMySelf ? "borderTopRightRadius" : "borderTopLeftRadius"]: "0",
      }
   }),
   time: {
      fontSize: "10px",
      mb: 0.5,
   }
}